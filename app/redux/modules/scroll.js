import { fromJS, toOrderedMap } from 'immutable'

const SET_BACKGROUND_TOP = 'SET_BACKGROUND_TOP'
const GET_WINDOW_POSITION_Y = 'GET_WINDOW_POSITION_Y'
const SET_PARALLAX_TOP = 'SET_PARALLAX_TOP'
const SET_HOME_IMAGES_TOP = 'SET_HOME_IMAGES_TOP'

export function getWindowPositionY({ fromTop }) {
    return {
        type: GET_WINDOW_POSITION_Y,
        fromTop
    }
}

export function setBgTop({ bgTop }) {
    return {
        type: SET_BACKGROUND_TOP,
        bgTop
    }
}

export function calcBgTop() {
    return function (dispatch, getState) {
        const bgTop = (0 - (getState().scroll.get('windowPositionY') * .3))
        dispatch(setBgTop({bgTop}))
    }
}

export function setParallaxTop({ parallaxTop }) {
    return {
        type: SET_PARALLAX_TOP,
        parallaxTop
    }
}

export function calcParallaxTop() {
    return function (dispatch, getState) {
        const parallaxTop = (0 - (getState().scroll.get('windowPositionY') * .5))
        dispatch(setParallaxTop({ parallaxTop }))
    }
}


export function setHomeImagesTop({ homeImagesTop }) {
    return {
        type: SET_HOME_IMAGES_TOP,
        homeImagesTop
    }
}

const initialState = fromJS({
    windowPositionY: 0,
    bgTop: 0,
    parallaxTop: 0,
    homeImagesTop: 0
})

export default function scroll(state = initialState, action) {
    switch (action.type) {
        case GET_WINDOW_POSITION_Y:
            return state.merge({
                windowPositionY: action.fromTop
            })
        case SET_BACKGROUND_TOP:
            return state.merge({
                bgTop: action.bgTop
            })
        case SET_PARALLAX_TOP:
            return state.merge({
                parallaxTop: action.parallaxTop
            })
        case SET_HOME_IMAGES_TOP:
            return state.merge({
                homeImagesTop: action.homeImagesTop
            })
        default:
            return state
    }
}