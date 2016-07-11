import { Map, List, fromJS } from 'immutable'
import { randomNotes } from 'scripts/utils/noteTestingFunctions'
import targetNoteThunk from './notes'

const CHECK_CORRECT = 'CHECK_CORRECT'
const GET_NOTES_MISSED = 'GET_NOTES_MISSED'
const INCREASE_COUNT = 'INCREASE_COUNT'
const FINISH_DATE = 'FINISH_DATE'
const START_GAME = 'START_GAME'
const CHOOSE_RANDOM_NOTE = 'CHOOSE_RANDOM_NOTE'
const SET_DATE_COMPLETE = 'SET_DATE_COMPLETE'
const COMPLETE_ROUND = 'COMPLETE_ROUND'

const tracker = [{name: 'C4', count: 0},
    {name: 'Db4', count: 0, missed: 0},
    {name: 'D4', count: 0, missed: 0},
    {name: 'Eb4', count: 0, missed: 0},
    {name: 'E4', count: 0, missed: 0},
    {name: 'F4', count: 0, missed: 0},
    {name: 'Gb4', count: 0, missed: 0},
    {name: 'G4', count: 0, missed: 0},
    {name: 'Ab4', count: 0, missed: 0},
    {name: 'A4', count: 0, missed: 0},
    {name: 'Bb4', count: 0, missed: 0},
    {name: 'B4', count: 0, missed: 0}]

//on every click
export function checkCorrect(targetNote, selectedNoteChosen) {
    return {
        type: CHECK_CORRECT,
        correct: (targetNote === selectedNoteChosen),
        noteMissed: targetNote !== selectedNoteChosen ? targetNote : ''
    }
}

export function increaseCount(targetNote) {
    return {
        type: INCREASE_COUNT,
        targetNote
    }
}

export function startGame() {
    return {
        type: START_GAME
    }
}

export function chooseRandomNote() {

    return function (dispatch, getState) {
        const currentTracker = getState().training.tracker
        const randomNote = randomNote(currentTracker)
        if (randomNotes === '') {
            dispatch({type: COMPLETE_ROUND})
            if (getState().training.roundsComplete === 2) {
                dispatch(setDateComplete)
            }
        } else {
            dispatch(targetNoteThunk(randomNote))
        }
    }

}

function completeRound() {
    return {type: COMPLETE_ROUND}
}


//type: GET_NOTES_MISSED

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
    notesMissed: []
})

export default function training(state = initialState, action) {
    switch (action.type) {
        case CHECK_CORRECT:
            return state.merge({
                attempts: state.get('attempts') + 1,
                correct: action.correct,
                notesMissed: state.get('notesMissed').concat(action.noteMissed)
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