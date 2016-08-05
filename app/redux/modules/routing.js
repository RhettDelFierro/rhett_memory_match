import { fromJS } from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

//export function locationChange(route) {
//    return {
//        type: LOCATION_CHANGE,
//        payload: route
//    }
//
//}

const initialState = fromJS({
    locationBeforeTransitions: null
});
export default function routing(state = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            return state.set('routing', {locationBeforeTransitions: action.payload})
        default:
            return state
    }
}