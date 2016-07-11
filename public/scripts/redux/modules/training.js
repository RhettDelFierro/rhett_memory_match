import { Map, List, fromJS } from 'immutable'
import { counterIncrement } from 'scripts/utils/noteTestingFunctions'

const CHECK_CORRECT = 'CHECK_CORRECT'
const GET_NOTES_MISSED = 'GET_NOTES_MISSED'
const INCREASE_COUNT = 'INCREASE_COUNT'
const FINISH_DATE = 'FINISH_DATE'
const START_GAME = 'START_GAME'

const tracker = [{name: 'C4', count: 0},
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
    {name: 'B4', count: 0}]

//on every click
export function checkCorrect(targetNote, selectedNoteChosen) {
    return {
        type: CHECK_CORRECT,
        correct: (targetNote === selectedNoteChosen)
    }
}

export function increaseCount(targetNote) {
    return {
        type: INCREASE_COUNT,
        targetNote
    }
}

export function startGame(){
    return {
        type: START_GAME
    }
}



//type: GET_NOTES_MISSED

//reducer composition:
const initialStateTracker = tracker;

function increaseTracker(state = initialStateTracker, action) {
    switch(action.type){
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
    finishDate: '',
    completed: false,
    roundsCompleted: 0,
    start: false
})

export default function training(state = initialState, action){
    switch (action.type) {
        case CHECK_CORRECT:
            return state.merge({
                attempts: state.get('attempts') + 1,
                correct: action.correct
            })
        case INCREASE_COUNT:
            return state.merge({
                tracker: increaseTracker(state.get('tracker'), action)
            })
        case START_GAME:
            return state.merge({
                start: true
            })
        default:
            return state
    }
}