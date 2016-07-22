import { Map } from 'immutable'

const CHANGE_TARGET_NOTE_VOLUME = 'CHANGE_TARGET_NOTE_VOLUME'
const CHANGE_NOISE_VOLUME = 'CHANGE_NOISE_VOLUME'
const CHANGE_MASKING_NOTES_VOLUME = 'CHANGE_MASKING_NOTES_VOLUME'

export function targetNoteVolumeChange(value) {
    return {
        type: CHANGE_TARGET_NOTE_VOLUME,
        value
    }
}

export function noiseVolumeChange(value) {
    return {
        type: CHANGE_NOISE_VOLUME,
        value
    }
}

export function maskingNotesVolumeChange(value) {
    return {
        type: CHANGE_MASKING_NOTES_VOLUME,
        value
    }
}

const initialState = Map({
    targetNoteVolume: "2.5",
    noiseVolume: "2.5",
    maskingNotesVolume: "2.5"
})

export default function volume (state = initialState, action) {
    switch (action.type) {
        case CHANGE_TARGET_NOTE_VOLUME:
            return state.merge({targetNoteVolume: action.value})
        case CHANGE_NOISE_VOLUME:
            return state.merge({noiseVolume: action.value})
        case CHANGE_MASKING_NOTES_VOLUME:
            return state.merge({maskingNotesVolume: action.value})
        default:
            return state
    }
}