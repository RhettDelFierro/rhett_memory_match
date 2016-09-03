import { fromJS, toOrderedMap } from 'immutable'
import { tallyCount } from 'utils/scoresFunctions'
import { spotifyAuth } from 'utils/songsAPI'
import { authUser } from 'redux/modules/users'
import { closeModal } from './modal'

const GET_SONGS = 'GET_SONGS'

export function getSongs({notesMissed}) {
    return function (dispatch) {
        const notesChosen = fromJS(notesMissed).keySeq()
        dispatch({type: GET_SONGS, notesChosen})
    }
}

export function spotifyLogin(){
    return async function (dispatch,getState) {
        //do NOT forget to throw in the error callback also.
        spotifyAuth({callback: ({id}) =>{
            dispatch(closeModal())
            dispatch(authUser(id))
            console.log('callback fired! id:',id)
        }})
    }
}

const initialState = fromJS({
    notesSelected: []
})

export default function songs(state = initialState, action) {
    switch (action.type) {
        case GET_SONGS:
            return state.merge({
                notesSelected: state.get('notesSelected').concat(action.notesChosen)
            })
        default:
            return state
    }
}