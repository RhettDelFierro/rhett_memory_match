import { fromJS, toOrderedMap } from 'immutable'

const SET_HOME_BACKGROUND_POSITION_Y = 'SET_HOME_BACKGROUND_POSITION_Y'
const GET_WINDOW_POSITION_Y = 'GET_WINDOW_POSITION_Y'

export function getWindowPositionY({ fromTop }){
    return {
        type: GET_WINDOW_POSITION_Y,
        fromTop
    }
}

export function setHomeBackgroundPositionY({ homeBackgroundPositionY }) {
    return {
        type: SET_HOME_BACKGROUND_POSITION_Y,
        homeBackgroundPositionY
    }
}

export function calculateHomeBackgroundPositionY({ fromTop }){
    console.log(fromTop)
    //MAY BE A THUNK
    return function (dispatch, getState) {
        const homeBackgroundPositionY = (0 - (fromTop * .3))
        dispatch(getWindowPositionY({fromTop}))
        dispatch(setHomeBackgroundPositionY({homeBackgroundPositionY }))
    }
}

const initialState = fromJS({
    windowPositionY: 0,
    homeBackgroundPositionY: 0
})

export default function scroll(state = initialState, action) {
    switch(action.type){
        case GET_WINDOW_POSITION_Y:
            return state.merge({
                windowPositionY: action.fromTop
            })
        case SET_HOME_BACKGROUND_POSITION_Y:
            return state.merge({
                homeBackgroundPositionY: action.homeBackgroundPositionY
            })
        default:
            return state
    }
}