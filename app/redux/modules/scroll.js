import { fromJS, toOrderedMap } from 'immutable'

const SET_BACKGROUND_TOP = 'SET_BACKGROUND_TOP'
const GET_WINDOW_POSITION_Y = 'GET_WINDOW_POSITION_Y'
const SET_PARALLAX_TOP = 'SET_PARALLAX_TOP'
const SET_HOME_IMAGES_TOP = 'SET_HOME_IMAGES_TOP'
const SET_HOME_IMAGES_BOTTOM = 'SET_HOME_IMAGES_BOTTOM'
const SET_HEADER_HEIGHT = 'SET_HEADER_HEIGHT'
const SET_APP_PICTURES_TOP = 'SET_APP_PICTURES_TOP'
const SET_APP_PICTURES_BOTTOM = 'SET_APP_PICTURES_BOTTOM'

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

export function setHomeImagesBottom({ homeImagesBottom }) {
    return {
        type: SET_HOME_IMAGES_BOTTOM,
        homeImagesBottom
    }
}

export function setHeaderHeight({headerHeight}) {
    return {
        type: SET_HEADER_HEIGHT,
        headerHeight
    }
}

export function setAppPicturesTop({ appPicturesTop }) {
    return {
        type: SET_APP_PICTURES_TOP,
        appPicturesTop
    }
}

export function setAppPicturesBottom({ appPicturesBottom }) {
    return {
        type: SET_APP_PICTURES_BOTTOM,
        appPicturesBottom
    }
}


const initialState = fromJS({
    windowPositionY: 0,
    bgTop: 0,
    parallaxTop: 0,
    homeImagesTop: 0,
    homeImagesBottom: 0,
    headerHeight: 0,
    appPicturesTop: 0,
    appPicturesBottom: 0
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
        case SET_HEADER_HEIGHT:
            return state.merge({
                headerHeight: action.headerHeight
            })
        case SET_HOME_IMAGES_TOP:
            return state.merge({
                homeImagesTop: action.homeImagesTop
            })
        case SET_HOME_IMAGES_BOTTOM:
            return state.merge({
                homeImagesBottom: action.homeImagesBottom
            })
        case SET_APP_PICTURES_TOP:
            return state.merge({
                appPicturesTop: action.appPicturesTop
            })
        case SET_APP_PICTURES_BOTTOM:
            return state.merge({
                appPicturesBottom: action.appPicturesBottom
            })
        default:
            return state
    }
}