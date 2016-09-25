import { fromJS } from 'immutable'

const OPEN_BREAKER = 'OPEN_BREAKER'
const CLOSE_BREAKER = 'CLOSE_BREAKER'

export function openBreaker ({ breakerType }) {
    return {
        type: OPEN_INFO_BREAKER,
        breakerType
    }

}

export function closeBreaker ({ breakerType }) {
    return {
        type: CLOSE_BREAKER,
        breakerType
    }
}


const initialState = fromJS({
    appInfoBreaker: false,
    appPicturesBreaker: false
})

export default function breaker (state = initialState, action) {
    switch (action.type) {
        case OPEN_BREAKER :
            return state.set(action.breakerType, true)
        case CLOSE_BREAKER :
            return state.set(action.breakerType, false)
        default :
            return state
    }
}