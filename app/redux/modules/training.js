import { Map, List, fromJS } from 'immutable'
import { randomNotes, playNotes, maskingNotes, handleIncorrect, buffer, makeNoise } from 'utils/noteTestingFunctions'
import { notes, tracker } from 'config/constants'
import { loadNotes, makeNotesInfo } from 'utils/loadingNotes'
import { locationChange } from 'redux/modules'
import { push } from 'react-router-redux'
import { checkMode, setScores } from 'utils/scoresFunctions'

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
const PROCEED = 'PROCEED'

//clears store, sets the mode.
export function setMode() {
    return async function (dispatch, getState) {
        const mode = checkMode(getState().scores)
        dispatch({type: RESET_TRAINING})
        dispatch({type: SET_MODE, mode})
    }
}

//Redux storing the name of the note randomly chosen.
export function targetNoteChosen(targetNote) {
    return {
        type: TARGET_NOTE_CHOSEN,
        targetNote
    }
}

//Redux storing the name of the note chosen by user.
export function selectedNoteChosen(selectedNote) {
    return {
        type: SELECTED_NOTE_CHOSEN,
        selectedNote
    }
}

//Clears Redux store of both targetNote and selectedNote.
//Also sets onCheck to false.
export function completeGuess() {
    return {type: COMPLETE_GUESS}
}

//attempts +1, boolean check, sets onCheck to true.
export function checkCorrect() {
    return {
        type: CHECK_CORRECT
    }
}

//adds to List of notes chosen incorrectly.
export function noteMissed() {
    return {
        type: NOTE_MISSED
    }
}

//increases count on tracker.
export function increaseCount({ targetNote, instrument, octave }) {
    return {
        type: INCREASE_COUNT,
        targetNote,
        instrument,
        octave
    }
}

//called when chooseRandomNote() returns ''
export function completeRound() {
    return {type: COMPLETE_ROUND}
}

export function proceed() {
    return async function (dispatch, getState) {
        const score = setScores({
            mode: getState().training.get('mode'),
            state: getState()
        })
        //GET THE SCORE AND THE MODE THAT JUST PLAYED AND CALL THE APPROPRIATE SET SCORE FUNCTION FROM SCORES REDUCER.
        dispatch({type: PROCEED})
    }
}

export function startGame() {
    return async function (dispatch, getState) {
        const notesUsed = await loadNotes(getState().training.get('tracker'))
        const makeNotes = await notesUsed.map((note) => {
            return {
                name: note.get('name'),
                piano: {
                    four: note.getIn([note.get('name'), 'piano']).then((note) => note.four),
                    five: note.getIn([note.get('name'), 'piano']).then((note) => note.five)
                },
                guitar: {
                    three: note.getIn([note.get('name'), 'guitar']).then((note) => note.three),
                    four: note.getIn([note.get('name'), 'guitar']).then((note) => note.four)
                }
            }
        })
        const notesBuffer = await makeNotesInfo(makeNotes)
        dispatch({type: START_GAME, notesBuffer})
    }
}


export function playIncorrect() {
    return async function (dispatch, getState) {
        try {
            const note = getState().training.get('targetNote')
            const notesBuffer = getState().training.get('notesBuffer')

            //I also want to dispatch to handle the rendering of missed note.
            const incorrect = await playNotes({
                note,
                octave: 'four',
                instrument: 'piano',
                volume: getState().volume.get('targetNoteVolume'),
                notesBuffer,
                masking: true
            })
            dispatch(guessed())
        } catch (error) {
            Error('error in playNote thunk', error)
        }
    }
}

//handle a guess after every guess, this will happen:
export function guessed() {
    return async function (dispatch, getState) {
        try {
            const currentTracker = getState().training.get('tracker')
            const randomMaskingNotes = maskingNotes(currentTracker)
            const noiseVolume = getState().volume.get('noiseVolume')
            const notesBuffer = getState().training.get('notesBuffer')

            //I also want to dispatch to handle the rendering of missed note.
            const noise = await makeNoise({time: 1000, volume: noiseVolume})
            const maskingNotesArray = await Promise.all(randomMaskingNotes.map((value) => playNotes({
                note: value,
                time: 2000,
                volume: getState().volume.get('maskingNotesVolume'),
                notesBuffer,
                masking: true
            })))

            dispatch(completeGuess())

            dispatch(chooseRandomNote())

        } catch (error) {
            Error('error in buffer', error)
        }
    }
}

//called after chooseRandomNote: after every guess to start the next
export function targetNoteThunk({ note, instrument, octave }) {
    return function (dispatch, getState) {
        const volume = getState().volume.get('targetNoteVolume')
        const notesBuffer = getState().training.get('notesBuffer')
        playNotes({note, instrument, octave, volume, notesBuffer}).then(() => {
            //make it so you can't choose anything before this:
            dispatch(targetNoteChosen(note))
            dispatch(increaseCount({targetNote: note, instrument, octave}))
        })
    }
}

export function chooseRandomNote() {

    return function (dispatch, getState) {
        const currentTracker = getState().training.get('tracker')
        const currentMode = getState().training.get('mode')
        const randomNote = randomNotes({tracker: currentTracker, mode: currentMode})

        if (randomNote === '') {
            const mode = getState().training.get('mode')
            dispatch({type: COMPLETE_ROUND})

            //move this possible to type: PROCEED.
            dispatch({type: SET_DATE_COMPLETE})

        } else {
            //chooses next target note
            dispatch(targetNoteThunk({
                note: randomNote.get('name'),
                instrument: randomNote.get('instrument'),
                octave: randomNote.get('octave')
            }))
        }
    }

}

//reducer composition:
const initialStateTracker = tracker

function increaseTracker(state = initialStateTracker, action) {

    switch (action.type) {
        case INCREASE_COUNT:
            return state.update(state.findIndex((item) => item.get('name') === action.targetNote),
                (item) => item.setIn([action.instrument, action.octave], item.getIn([action.instrument, action.octave]) + 1))
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
    sessionCompleted: false,
    start: false,
    notesMissed: [],
    targetNote: "",
    targetNotePlayed: false,
    selectedNote: "",
    selectedNotePlayed: false,
    notesUsed: {},
    onCheck: false,
    roundCompleted: false,
    mode: 'pretest',
    notesBuffer: {}
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
                start: true,
                notesBuffer: action.notesBuffer,
                roundCompleted: false
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
                roundCompleted: true,
                score: Math.floor(((60 - state.get('notesMissed').size) / 60) * 100) + '%'
            })
        case SET_MODE:
            return state.merge({
                mode: action.mode
            })
        case PROCEED:
            return state.merge({
                completed: false
            })
        case RESET_TRAINING:
            return initialState
        default:
            return state
    }
}