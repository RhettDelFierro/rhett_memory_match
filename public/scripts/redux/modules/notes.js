const TARGET_NOTE_CHOSEN = 'TARGET_NOTE_CHOSEN'
const TARGET_NOTE_PLAYED = 'TARGET_NOTE_PLAYED'
const SELECTED_NOTE_CHOSEN = 'SELECTED NOTE CHOSEN'

//generated at random
export function targetNoteChosen(targetNoteChosen) {
    return {
        type: TARGET_NOTE_CHOSEN,
        targetNoteChosen
    }
}

export function targetNotePlayed() {
    return {
        type: TARGET_NOTE_PLAYED
    }
}

export function selectedNoteChosen(selectedNoteChosen) {
    return {
        type: SELECTED_NOTE_CHOSEN,
        selectedNoteChosen
    }
}

const initialState = {
    targetNoteChosen: "",
    targetNotePlayed: false,
    selectedNoteChosen: ""
}

export default function notes(state = {}, action) {
    switch (action.type) {
        case(TARGET_NOTE_CHOSEN):
            return {
                ...state,
                targetNoteChosen: action.targetNoteChosen
            }
        case(TARGET_NOTE_PLAYED):
            return {
                ...state,
                targetNotePlayed: true
            }
        case(SELECTED_NOTE_CHOSEN):
            return {
                ...state,
                selectedNoteChosen: action.selectedNoteChosen
            }
        default:
            return state
    }
}