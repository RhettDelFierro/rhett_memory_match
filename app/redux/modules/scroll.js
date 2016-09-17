import { fromJS, toOrderedMap } from 'immutable'

const SET_HOME_BACKGROUND_POSITION_Y = 'SET_HOME_BACKGROUND_POSITION_Y'
const GET_WINDOW_POSITION_Y = 'GET_WINDOW_POSITION_Y'
const SET_HOME_PARALLAX_CONTENT_POSITION_Y = 'SET_HOME_PARALLAX_CONTENT_POSITION_Y'

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

export function setParallaxContentPositionY({ parallaxContentPositionY }) {
    return {
        type: SET_HOME_PARALLAX_CONTENT_POSITION_Y,
        parallaxContentPositionY
    }
}

export function calculateHomeBackgroundPositionY(){
    return function (dispatch, getState) {
        const homeBackgroundPositionY = (0 - (getState().scroll.get('windowPositionY') *.3))
        dispatch(setHomeBackgroundPositionY({homeBackgroundPositionY }))
    }
}

export function calculateParallaxContentPositionY() {
    return function (dispatch,getState) {
        const parallaxContentPositionY = (0 - (getState().scroll.get('windowPositionY') *.5))
        dispatch(setParallaxContentPositionY({ parallaxContentPositionY }))
    }
}

const initialState = fromJS({
    windowPositionY: 0,
    homeBackgroundPositionY: 0,
    parallaxContentPositionY: 0
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
        case SET_HOME_PARALLAX_CONTENT_POSITION_Y:
            return state.merge({
                parallaxContentPositionY: action.parallaxContentPositionY
            })
        default:
            return state
    }
}