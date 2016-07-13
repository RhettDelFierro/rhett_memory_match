import { Map, List, fromJS } from 'immutable'
import { increaseCount } from './training'

const TARGET_NOTE_CHOSEN = 'TARGET_NOTE_CHOSEN'
const TARGET_NOTE_PLAYED = 'TARGET_NOTE_PLAYED'
const SELECTED_NOTE_CHOSEN = 'SELECTED NOTE CHOSEN'

//generated at random
function targetNoteChosen(targetNoteChosen) {
    return {
        type: TARGET_NOTE_CHOSEN,
        targetNoteChosen
    }
}

export function selectedNoteChosen(selectedNoteChosen) {
    return {
        type: SELECTED_NOTE_CHOSEN,
        selectedNoteChosen
    }
}

export function targetNoteThunk(targetNoteChosen){
    return function (dispatch,getState) {
        dispatch(targetNoteChosen(targetNoteChosen))
        dispatch(increaseCount(targetNoteChosen))
    }
}

const initialState = Map({
    targetNoteChosen: "",
    targetNotePlayed: false,
    selectedNoteChosen: "",
    selectedNotePlayed: false
})

export default function notes(state = {}, action) {
    switch (action.type) {
        case(TARGET_NOTE_CHOSEN):
            return state.merge({
                targetNoteChosen: action.targetNoteChosen,
                selectedNoteChosen: '',
                targetNotePlayed: true
            })

        case(SELECTED_NOTE_CHOSEN):
            return state.merge({
                selectedNoteChosen: action.selectedNoteChosen,
                selectedNotePlayed: true,
                targetNotePlayed: false
            })
        default:
            return state
    }
}