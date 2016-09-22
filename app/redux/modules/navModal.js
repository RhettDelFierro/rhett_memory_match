import { fromJS } from 'immutable'

const OPEN_NAV_MODAL = 'OPEN_NAV_MODAL'
const CLOSE_NAV_MODAL = 'CLOSE_NAV_MODAL'

export function openNavModal () {
    return {
        type: OPEN_NAV_MODAL
    }
}

export function closeNavModal () {
    return {
        type: CLOSE_NAV_MODAL
    }
}

const initialState = fromJS({
    isNavOpen: false
})

export default function navModal (state = initialState, action) {
    switch (action.type) {
        case OPEN_NAV_MODAL :
            return state.merge({
                isNavOpen: true
            })
        case CLOSE_NAV_MODAL :
            return state.merge({
                isNavOpen: false
            })
        default :
            return state
    }
}