import { fromJS } from 'immutable'

const OPEN_NAV_MODAL = 'OPEN_NAV_MODAL'
const CLOSE_NAV_MODAL = 'CLOSE_NAV_MODAL'

export function openModal () {
    return {
        type: OPEN_NAV_MODAL
    }
}

export function closeModal () {
    return {
        type: CLOSE_NAV_MODAL
    }
}

const initialState = fromJS({
    isOpen: false
})

export default function navModal (state = initialState, action) {
    switch (action.type) {
        case OPEN_NAV_MODAL :
            return state.merge({
                isOpen: true
            })
        case CLOSE_NAV_MODAL :
            return state.merge({
                isOpen: false
            })
        default :
            return state
    }
}