import { fromJS } from 'immutable'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'

export function authUser (uid) {
    return {
        type: AUTH_USER,
        uid
    }
}

function unauthUser () {
    return {
        type: UNAUTH_USER
    }
}

function fetchingUser () {
    return {
        type: FETCHING_USER
    }
}

const initialState = fromJS({
    isAuthed: false,
    isFetching: false,
    error: false,
    authId: '',
    userInfo: {}
})

export default function users(state = initialState, action){
    switch(action.type) {
        default:
            return state
    }
}