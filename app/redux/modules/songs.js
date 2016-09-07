import { fromJS, toOrderedMap } from 'immutable'
import { tallyCount } from 'utils/scoresFunctions'
import { spotifyAuth, getSongsAPI } from 'utils/songsAPI'
import { authUser } from 'redux/modules/users'
import { closeModal } from './modal'

const GET_SONGS = 'GET_SONGS'
const FETCHING_SONGS = 'FETCHING_SONGS'
const FETCHING_SONGS_SUCCESS = 'FETCHING_SONGS_SUCCESS'

export function getSongs({notesMissed}) {
    return async function (dispatch) {
        dispatch({type: GET_SONGS})
        const notesChosen = fromJS(notesMissed).keySeq()
        const songs = await getSongsAPI({notesChosen})
        dispatch(fetchingSongsSuccess(songs))
    }
}

export function fetchingSongsSuccess(songs){
    return {
        type: FETCHING_SONGS_SUCCESS,
        songs
    }
}

export function spotifyLogin(){
    return async function (dispatch,getState) {
        //do NOT forget to throw in the error callback also.
        spotifyAuth({callback: ({id}) =>{
            dispatch(closeModal())
            dispatch(authUser(id))
        }})
    }
}

const initialState = fromJS({
    fetchingSongs: true,
    notesSelected: {}
})

export default function songs(state = initialState, action) {
    switch (action.type) {
        case GET_SONGS:
            return state.merge({
                fetchingSongs: true
            })
        case FETCHING_SONGS_SUCCESS:
            return state.merge({
                fetchingSongs: false,
                notesSelected: action.songs
            })
        default:
            return state
    }
}