import { Map, List, fromJS } from 'immutable'
import { randomNotes, loadNotes, playNotes, makeNoise, maskingNotes, handleIncorrect } from 'utils/noteTestingFunctions'

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

const tracker = [
    {name: 'C4', count: 0},
    {name: 'Db4', count: 0},
    {name: 'D4', count: 0},
    {name: 'Eb4', count: 0},
    {name: 'E4', count: 0},
    {name: 'F4', count: 0},
    {name: 'Gb4', count: 0},
    {name: 'G4', count: 0},
    {name: 'Ab4', count: 0},
    {name: 'A4', count: 0},
    {name: 'Bb4', count: 0},
    {name: 'B4', count: 0}
]

//generated at random
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

export function playNote({ note, time, volume } ) {

    return function (dispatch, getState) {

        const currentTracker = getState().training.get('tracker')
        let randomMaskingNotes = maskingNotes(currentTracker)

        //I also want to dispatch to handle the rendering of missed note.
        handleIncorrect( { note, time, volume, randomMaskingNotes })
            .then((maskingNotes) => {
                //dispatch other action creators to reset.
                dispatch(completeGuess())
                //maskingNotes is a resolved promise. Not going to do anything with it.
                dispatch(chooseRandomNote())
            })
            .catch((error) => Error('error in playNote thunk', error))
    }
}

export function completeGuess() {
    return { type: COMPLETE_GUESS }
}

export function targetNoteThunk(targetNote) {
    return function (dispatch, getState) {
        dispatch(targetNoteChosen(targetNote))
        dispatch(increaseCount(targetNote))
    }
}

//on every note click
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

export function startGame() {
    return function (dispatch) {
        loadNotes().then((notesUsed) => {
            dispatch({type: START_GAME})
        })
    }
}

export function chooseRandomNote() {

    return function (dispatch, getState) {
        const currentTracker = getState().training.get('tracker')
        const randomNote = randomNotes(currentTracker)
        if (randomNote === '') {
            dispatch({type: COMPLETE_ROUND})
            if (getState().training.roundsComplete === 2) {
                dispatch(setDateComplete())
            }
        } else {
            //chooses next target note
            //dispatch(targetNoteThunk(randomNote.first().get('name')))
            dispatch(targetNoteThunk(randomNote.get('name')))
        }
    }

}

export function completeRound() {
    return {type: COMPLETE_ROUND}
}

//reducer composition:
const initialStateTracker = tracker;

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
    roundCompleted: false

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
                notesMissed: state.get('notesMissed').push(state.get('targetNote')),
                noteBuffer: state.getIn('notesUsed', state.get(state.get('targetNote')))
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
                selectedNote:'',
                selectedNotePlayed: false,
                onCheck: false
            })
        case COMPLETE_ROUND:
            return state.merge({
                roundsCompleted: state.get('roundsCompleted') + 1,
                roundCompleted: true
            })
        default:
            return state
    }
}