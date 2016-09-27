import { Map } from 'immutable'

const CHANGE_TARGET_NOTE_VOLUME = 'CHANGE_TARGET_NOTE_VOLUME'
const CHANGE_NOISE_VOLUME = 'CHANGE_NOISE_VOLUME'
const CHANGE_MASKING_NOTES_VOLUME = 'CHANGE_MASKING_NOTES_VOLUME'
const SET_VOLUME = 'SET_VOLUME'

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

export function setVolume({targetNoteVolume, noiseVolume, maskingNotesVolume}) {
    return {
        type: SET_VOLUME,
        targetNoteVolume,
        noiseVolume,
        maskingNotesVolume
    }
}

const initialState = Map({
    targetNoteVolume: "4.5",
    noiseVolume: "4.5",
    maskingNotesVolume: "4.5"
})

export default function volume (state = initialState, action) {
    switch (action.type) {
        case CHANGE_TARGET_NOTE_VOLUME:
            return state.merge({targetNoteVolume: action.value})
        case CHANGE_NOISE_VOLUME:
            return state.merge({noiseVolume: action.value})
        case CHANGE_MASKING_NOTES_VOLUME:
            return state.merge({maskingNotesVolume: action.value})
        case SET_VOLUME: {
            return state.marge({
                targetNoteVolume: action.targetNoteVolume,
                noiseVolume: action.noiseVolume,
                maskingNotesVolume: action.maskingNotesVolume
            })
        }
        default:
            return state
    }
}