import { fromJS } from 'immutable'
import { registerUser } from 'utils/userFunctions'
import { closeModal } from 'redux/modules/modal'

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

export function fetchingUserSuccess({user_id, user, timestamp, token}) {
    return {
        type: FETCHING_USER_SUCCESS,
        user_id,
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
            console.log(data)
            const user_id = data.user.user_id
            const user = data.user
            const token = data.token
            console.log("register thunk coming back from userFunctions.registerUser:", user)
            dispatch(fetchingUserSuccess({user_id, user, timestamp: Date.now(), token}))
            dispatch(closeModal())
            dispatch(authUser(user_id))
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
        return dispatch(fetchingUserSuccess({uid, user, timestamp: Date.now(), token}))
    }
}

const userInitialState = fromJS({
    info: {
        username: '',
        user_id: '',
        avatar: '',
        email:''
    }
})

function user(state = userInitialState, action) {
    switch(action.type) {
        case FETCHING_USER_SUCCESS:
            return state.merge({
                info: action.user
            })
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
        case AUTH_USER:
            return state.merge({
                isAuthed: true,
                authId: action.uid
            })
        case FETCHING_USER_SUCCESS:
            return state.merge({
                [action.user_id]: user(state.get(action.user_id), action)
            })
        default:
            return state
    }
}