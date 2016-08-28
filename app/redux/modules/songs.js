import { fromJS, toOrderedMap } from 'immutable'
import { tallyCount } from 'utils/scoresFunctions'

const GET_SONGS = 'GET_SONGS'

export function getSongs({notesMissed}) {
    return function (dispatch) {
        const notesChosen = fromJS(notesMissed).keySeq()
        dispatch({type: GET_SONGS, notesChosen})
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