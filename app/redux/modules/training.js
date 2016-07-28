import { Map, List, fromJS } from 'immutable'
import { randomNotes, playNotes, maskingNotes, handleIncorrect, buffer } from 'utils/noteTestingFunctions'
import { notes, tracker } from 'config/constants'
import { loadNotes } from 'utils/loadingNotes'

const CHECK_CORRECT = 'CHECK_CORRECT'
const GET_NOTES_MISSED = 'GET_NOTES_MISSED'
const INCREASE_COUNT = 'INCREASE_COUNT'
const FINISH_DATE = 'FINISH_DATE'
const START_GAME = 'START_GAME'
const CHOOSE_RANDOM_NOTE = 'CHOOSE_RANDOM_NOTE'
const SET_DATE_COMPLETE = 'SET_DATE_COMPLETE'
const COMPLETE_ROUND = 'COMPLETE_ROUND'
const TARGET_NOTE_CHOSEN = 'TARGET_NOTE_CHOSEN'
const TARGET_NOTE_PLAYED = 'TARGET_NOTE_PLAYED'
const SELECTED_NOTE_CHOSEN = 'SELECTED NOTE CHOSEN'
const NOTES_PATH = 'NOTES_PATH'
const NOTE_MISSED = 'NOTE_MISSED'
const COMPLETE_GUESS = 'COMPLETE_GUESS'
const SET_MODE = 'SET_MODE'
const RESET_TRAINING = 'RESET_TRAINING'

export function setMode(mode) {
    return {
        type: SET_MODE,
        mode
    }
}

export function targetNoteChosen(targetNote) {
    return {
        type: TARGET_NOTE_CHOSEN,
        targetNote
    }
}

export function selectedNoteChosen(selectedNote) {
    return {
        type: SELECTED_NOTE_CHOSEN,
        selectedNote
    }
}

export function completeGuess() {
    return {type: COMPLETE_GUESS}
}

export function checkCorrect() {
    return {
        type: CHECK_CORRECT
    }
}

export function noteMissed() {
    return {
        type: NOTE_MISSED
    }
}

export function increaseCount(targetNote) {
    return {
        type: INCREASE_COUNT,
        targetNote
    }
}

export function completeRound() {
    return {type: COMPLETE_ROUND}
}

export function resetTraining() {
    return { type: RESET_TRAINING}
}

export function startGame() {
    return function (dispatch, getState) {
        loadNotes(getState().training.get('tracker')).then((notesUsed) => {
            dispatch({type: START_GAME})
        })
    }
}


export function playIncorrect() {

    return function (dispatch, getState) {

        const note = getState().training.get('targetNote')
        const targetNoteVolume = getState().volume.get('targetNoteVolume')

        //I also want to dispatch to handle the rendering of missed note.
        playNotes({note, volume: targetNoteVolume})
            .then((result) => {
                dispatch(guessed())
            })
            .catch((error) => Error('error in playNote thunk', error))
    }
}

//handle a guess after every guess, this will happen:
export function guessed(){
    return function (dispatch, getState) {

        const currentTracker = getState().training.get('tracker')
        const randomMaskingNotes = maskingNotes(currentTracker)
        const maskingNotesVolume = getState().volume.get('maskingNotesVolume')
        const noiseVolume = getState().volume.get('noiseVolume')

        //I also want to dispatch to handle the rendering of missed note.
        buffer({randomMaskingNotes, maskingNotesVolume, noiseVolume })
            .then((maskingNotes) => {
                //dispatch other action creators to reset.
                dispatch(completeGuess())
                //maskingNotes is a resolved promise. Not going to do anything with it.
                dispatch(chooseRandomNote())
            })
            .catch((error) => Error('error in playNote thunk', error))
    }
}

//called after chooseRandomNote: after every guess to start the next
export function targetNoteThunk({ note }) {
    return function (dispatch, getState) {
        const volume = getState().volume.get('targetNoteVolume')
        playNotes({note , volume }).then(() => {
            //make it so you can't choose anything before this:
            dispatch(targetNoteChosen(note))
            dispatch(increaseCount(note))
        })
    }
}

export function chooseRandomNote() {

    return function (dispatch, getState) {
        const currentTracker = getState().training.get('tracker')
        const randomNote = randomNotes(currentTracker)
        if (randomNote === '') {
            dispatch({type: COMPLETE_ROUND})
            if (getState().training.roundsComplete === 3) {
                dispatch(setDateComplete())
            }
        } else {
            //chooses next target note
            dispatch(targetNoteThunk({ note: randomNote.get('name') }))
        }
    }

}

//reducer composition:
const initialStateTracker = tracker

function increaseTracker(state = initialStateTracker, action) {
    switch (action.type) {
        case INCREASE_COUNT:
            return state.update(state.findIndex((item) => item.get('name') === action.targetNote),
                (item) => item.set('count', item.get('count') + 1))
        default:
            return state
    }
}

const initialState = fromJS({
    correct: false,
    attempts: 0,
    tracker: tracker,
    score: 0,
    dateComplete: '',
    completed: false,
    roundsCompleted: 0,
    start: false,
    notesMissed: [],
    targetNote: "",
    targetNotePlayed: false,
    selectedNote: "",
    selectedNotePlayed: false,
    notesUsed: {},
    onCheck: false,
    roundCompleted: false,
    mode: 'pretest'
})

export default function training(state = initialState, action) {
    switch (action.type) {
        case(TARGET_NOTE_CHOSEN):
            return state.merge({
                targetNote: action.targetNote,
                targetNotePlayed: true,
                roundCompleted: false
            })
        case(SELECTED_NOTE_CHOSEN):
            return state.merge({
                selectedNote: action.selectedNote,
                selectedNotePlayed: true,
                targetNotePlayed: false
            })
        case CHECK_CORRECT:
            return state.merge({
                //attempts: state.set('attempts', state.get('attempts') + 1),
                attempts: state.get('attempts') + 1,
                correct: (state.get('targetNote') === state.get('selectedNote')),
                onCheck: true
            })
        case NOTE_MISSED:
            return state.merge({
                notesMissed: state.get('notesMissed').push(state.get('targetNote'))
            })
        case INCREASE_COUNT:
            return state.merge({
                tracker: increaseTracker(state.get('tracker'), action)
            })
        case START_GAME:
            return state.merge({
                start: true
            })
        case SET_DATE_COMPLETE:
            //send to format date converter.
            //going to need this property to make google event/send email.
            return state.merge({
                dateComplete: new Date()
            })
        case COMPLETE_GUESS:
            return state.merge({
                targetNote: '',
                selectedNote: '',
                selectedNotePlayed: false,
                onCheck: false
            })
        case COMPLETE_ROUND:
            return state.merge({
                roundsCompleted: state.get('roundsCompleted') + 1,
                roundCompleted: true,
                score: Math.floor(((60-state.get('notesMissed').size)/60) * 100) + '%'
            })
        case SET_MODE:
            return state.merge({
                mode: action.mode
            })
        case RESET_TRAINING:
            return initialState
        default:
            return state
    }
}