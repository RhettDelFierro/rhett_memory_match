import { fromJS } from 'immutable'

const OPEN_SONG_MODAL = 'OPEN_SONG_MODAL'
const CLOSE_SONG_MODAL = 'CLOSE_SONG_MODAL'

export function openSongModal () {
    return {
        type: OPEN_SONG_MODAL
    }
}

export function closeSongModal () {
    return {
        type: CLOSE_SONG_MODAL
    }
}

const initialState = fromJS({
    isOpen: false
})

export default function songModal (state = initialState, action) {
    switch (action.type) {
        case OPEN_SONG_MODAL :
            return state.merge({
                isOpen: true
            })
        case CLOSE_SONG_MODAL :
            return state.merge({
                isOpen: false
            })
        default :
            return state
    }
}