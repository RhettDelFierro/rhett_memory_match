import { Map, List, fromJS } from 'immutable'
import { randomNotes, loadNotes, playNotes, makeNoise } from 'scripts/utils/noteTestingFunctions'

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

export function playNote({note, time, volume}) {

    return function (dispatch, getState) {
        playNotes(note, time, volume)
            .then(() => makeNoise()
                .then(() => {
                    //random notes
                    const currentTracker = getState().training.tracker
                    let randomMaskingNotes = playNotes(currentTracker)
                    Promise.all(playNotes(randomMaskingNotes.map((note) => note),0, 2))
                }).then(()=> {
                    dispatch(chooseRandomNote)
                })
            )

    }
}

export function targetNoteThunk(targetNote) {
    return function (dispatch, getState) {
        dispatch(targetNoteChosen(targetNote))
        dispatch(increaseCount(targetNote))
    }
}

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
        loadNotes().then(() => {
            //dispatch the random targetNote action
            dispatch({type: START_GAME})

        })
    }
}

export function chooseRandomNote() {

    return function (dispatch, getState) {
        const currentTracker = getState().training.tracker
        const randomNote = randomNote(currentTracker)
        if (randomNote === '') {
            dispatch({type: COMPLETE_ROUND})
            if (getState().training.roundsComplete === 2) {
                dispatch(setDateComplete)
            }
        } else {
            //chooses next target note
            dispatch(targetNoteThunk(randomNote))
        }
    }

}

function completeRound() {
    return {type: COMPLETE_ROUND}
}

//reducer composition:
const initialStateTracker = tracker;

function increaseTracker(state = initialStateTracker, action) {
    switch (action.type) {
        case INCREASE_COUNT:
            return state.update(state.findIndex((item) => item.get('name') === action.targetNote,
                (item) => item.set('count', item.get('count') + 1)))
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
    selectedNotePlayed: false
})

export default function training(state = initialState, action) {
    switch (action.type) {
        case(TARGET_NOTE_CHOSEN):
            return state.merge({
                targetNote: action.targetNote,
                selectedNote: '',
                targetNotePlayed: true,
                selectedNotePlayed: false
            })

        case(SELECTED_NOTE_CHOSEN):
            return state.merge({
                selectedNote: action.selectedNote,
                selectedNotePlayed: true,
                targetNotePlayed: false
            })
        case CHECK_CORRECT:
            return state.merge({
                attempts: state.get('attempts') + 1,
                correct: (state.targetNote === state.selectedNote)
            })
        case NOTE_MISSED:
            return state.merge({
                notesMissed: state.get('notesMissed').concat(state.targetNote)
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
        case COMPLETE_ROUND:
            return state.merge({
                roundsComplete: state.get('roundsComplete') + 1
            })
        default:
            return state
    }
}