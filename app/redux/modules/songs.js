import { fromJS, toOrderedMap } from 'immutable'
import { tallyCount } from 'utils/scoresFunctions'
import { spotifyAuthAPI, getSongsAPI, getTrackURI } from 'utils/songsAPI'
import { authUser,spotifyAuth, fetchingUser, setLastRoute } from 'redux/modules/users'
import { closeModal } from './modal'
import { openSongModal } from './songModal'
import { push, goBack } from 'react-router-redux'
import { closeNavModal } from 'redux/modules/navModal'

const GET_SONGS = 'GET_SONGS'
const FETCHING_SONGS = 'FETCHING_SONGS'
const FETCHING_SONGS_SUCCESS = 'FETCHING_SONGS_SUCCESS'
const SELECT_TRACK = 'SELECT_TRACK'
const PLAY_TRACK = 'PLAY_TRACK'
const SET_TRACK_URI = 'SET_TRACK_URI'
const RESET_SONGS = 'RESET_SONGS'

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
        //problem here is it will get the route they are on, and if they're on /login, locationBeforeTransitions will be /login.
        //const lastRoute = getState().routing.getIn(['locationBeforeTransitions','pathname'])
        //if (lastRoute != '/login') {
        //    dispatch(setLastRoute({lastRoute}))
        //}
        //do NOT forget to throw in the error callback also.
        dispatch(fetchingUser())
        spotifyAuthAPI({callback: ({id}) => {
            dispatch(closeModal())
            dispatch(spotifyAuth())
            if (!getState().users.get('appLogin')) {
                dispatch(authUser(id))
            }
            dispatch(goBack())
            dispatch(closeNavModal())
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

export function resetSongs() {
    return {
        type: RESET_SONGS
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
        case RESET_SONGS:
            return initialState
        default:
            return state
    }
}