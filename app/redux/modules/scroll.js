import { fromJS, toOrderedMap } from 'immutable'

const SET_BACKGROUND_TOP = 'SET_BACKGROUND_TOP'
const GET_WINDOW_POSITION_Y = 'GET_WINDOW_POSITION_Y'
const SET_HOME_PARALLAX_CONTENT_POSITION_Y = 'SET_HOME_PARALLAX_CONTENT_POSITION_Y'
const SET_HOME_IMAGES_TOP = 'SET_HOME_IMAGES_TOP'

export function getWindowPositionY({ fromTop }){
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

    return function(dispatch,getState) {
        const bgTop = (0 - (getState().scroll.windowPositionY *.3))
        dispatch(setBgTop({ bgTop }))
    }
}

export function setParallaxContentPositionY({ parallaxContentPositionY }) {
    return {
        type: SET_HOME_PARALLAX_CONTENT_POSITION_Y,
        parallaxContentPositionY
    }
}

//export function calcBgTop({ fromTop }){
//        console.log('calcBgTop')
//        const bgTop = (0 - (fromTop *.3))
//        setBgTop({ bgTop })
//}

export function calculateParallaxContentPositionY() {
    return function (dispatch,getState) {
        const parallaxContentPositionY = (0 - (getState().scroll.get('windowPositionY') *.5))
        dispatch(setParallaxContentPositionY({ parallaxContentPositionY }))
    }
}

export function setTopHomeImages({ homeImagesTop }) {
    return {
        type: SET_HOME_IMAGES_TOP,
        homeImagesTop
    }
}

const initialState = fromJS({
    windowPositionY: 0,
    bgTop: 0,
    parallaxContentPositionY: 0,
    homeImagesTop: 0
})

export default function scroll(state = initialState, action) {
    switch(action.type){
        case GET_WINDOW_POSITION_Y:
            return state.merge({
                windowPositionY: action.fromTop
            })
        case SET_BACKGROUND_TOP:
            return state.merge({
                bgTop: action.bgTop
            })
        case SET_HOME_PARALLAX_CONTENT_POSITION_Y:
            return state.merge({
                parallaxContentPositionY: action.parallaxContentPositionY
            })
        case SET_HOME_IMAGES_TOP:
            return state.merge({
                homeImagesTop: action.homeImagesTop
            })
        default:
            return state
    }
}