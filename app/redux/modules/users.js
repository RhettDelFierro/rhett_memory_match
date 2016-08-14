import { fromJS } from 'immutable'
import { registerUser } from 'utils/userFunctions'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'

export function authUser(uid) {
    return {
        type: AUTH_USER,
        uid
    }
}

function unauthUser() {
    return {
        type: UNAUTH_USER
    }
}

function fetchingUser() {
    return {
        type: FETCHING_USER
    }
}

export function fetchingUserSuccess({uid, user, timestamp, token}) {
    return {
        type: FETCHING_USER_SUCCESS,
        uid,
        user,
        timestamp,
        token
    }
}

export function register({email, username, password}) {
    return async function (dispatch) {
        try {
            dispatch(fetchingUser())
            const data = await registerUser({username, email, password})
            const uid = data.uid
            const user = data.user
            const token = data.token
            dispatch(fetchingUserSuccess({uid, user, timestampe: Date.now(), token}))
            dispatch(authUser(uid))
            return uid
        } catch (error) {
            Error('error in registerUser', error)
        }
    }
}

export function loginUser({email, user, password}) {
    return async function (dispatch) {
        dispatch(fetchingUser())
        const data = await registerUser({user, email, password})
        const user = data.user
        const token = data.token
        return dispatch(fetchingUserSuccess({uid, user, timestampe: Date.now(), token}))
    }
}


const initialState = fromJS({
    isAuthed: false,
    isFetching: false,
    error: false,
    authId: '',
    userInfo: {}
})

export default function users(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}