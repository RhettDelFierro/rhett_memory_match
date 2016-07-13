import { Map, List, fromJS } from 'immutable'
import { increaseCount } from './training'

const TARGET_NOTE_CHOSEN = 'TARGET_NOTE_CHOSEN'
const TARGET_NOTE_PLAYED = 'TARGET_NOTE_PLAYED'
const SELECTED_NOTE_CHOSEN = 'SELECTED NOTE CHOSEN'
const NOTES_PATH = 'NOTES_PATH'

//generated at random
function targetNoteChosen(targetNote) {
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

//maybe a thunk
export function getNotesPath(notesObject){
    return {
        type: NOTES_PATH,
        notesObject
    }
}

export function targetNoteThunk(targetNote){
    return function (dispatch,getState) {
        dispatch(targetNoteChosen(targetNote))
        dispatch(increaseCount(targetNote))
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
                targetNote: action.targetNote,
                selectedNote: '',
                targetNotePlayed: true
            })

        case(SELECTED_NOTE_CHOSEN):
            return state.merge({
                selectedNote: action.selectedNote,
                selectedNotePlayed: true,
                targetNotePlayed: false
            })
        default:
            return state
    }
}