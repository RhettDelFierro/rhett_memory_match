import { fromJS, toOrderedMap } from 'immutable'
import { tallyCount } from 'utils/scoresFunctions'
import { spotifyAuth, getSongsAPI, getTrackURI } from 'utils/songsAPI'
import { authUser,spotifyAuth } from 'redux/modules/users'
import { closeModal } from './modal'
import { openSongModal } from './songModal'

const GET_SONGS = 'GET_SONGS'
const FETCHING_SONGS = 'FETCHING_SONGS'
const FETCHING_SONGS_SUCCESS = 'FETCHING_SONGS_SUCCESS'
const SELECT_TRACK = 'SELECT_TRACK'
const PLAY_TRACK = 'PLAY_TRACK'
const SET_TRACK_URI = 'SET_TRACK_URI'

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
            dispatch(spotifyAuth())
            dispatch(authUser(id))
        }})
    }
}

export function selectTrack(trackId) {
    return {
        type: SELECT_TRACK,
        trackId
    }
}

//probably should be a thunk to get the track uri from spotify api.
export function playTrack(){
    return async function(dispatch,getState){
        const trackId = getState().songs.get('selectedTrackId')
        let track = await getTrackURI({trackId})
        let trackURI = track.uri
        let previewURL = track.preview_url
        dispatch({ type: PLAY_TRACK, trackURI, previewURL })
    }
}

const initialState = fromJS({
    fetchingSongs: true,
    notesSelected: {},
    trackSelected: false,
    selectedTrackId: '',
    selectedTrackURI: 'spotify:track:1kiNatIrwDusOZfR29W0LJ',
    selectedTrackPreview: '',
    isPlaying: false
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
        case SELECT_TRACK:
            return state.merge({
                trackSelected: true,
                selectedTrackId: action.trackId
            })
        case PLAY_TRACK:
            return state.merge({
                selectedTrackURI: action.trackURI,
                selectedTrackPreview: action.previewURL
            })
        default:
            return state
    }
}