import { fromJS } from 'immutable'
import { registerUser, loginUser, logoutUser } from 'utils/userFunctions'
import { closeModal } from 'redux/modules/modal'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const LOGOUT_USER = 'LOGOUT_USER'
const SPOTIFY_AUTH = 'SPOTIFY_AUTH'
const FORM_LOGIN = 'FORM_LOGIN'

export function authUser(uid) {
    return {
        type: AUTH_USER,
        uid
    }
}

export function spotifyAuth(){
    return {
        type: SPOTIFY_AUTH
    }
}

export function formLogin(){
    return {
        type: FORM_LOGIN
    }
}

function unauthUser() {
    return {
        type: UNAUTH_USER
    }
}

export function fetchingUser() {
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
            const user_id = data.user.user_id
            const user = data.user
            dispatch(fetchingUserSuccess({user_id, user, timestamp: Date.now()}))
            dispatch(closeModal())
            dispatch(formLogin())
            dispatch(authUser(user_id))
            return user_id
        } catch (error) {
            Error('error in registerUser', error)
        }
    }
}

export function login({email, password}) {
    return async function (dispatch) {
        try {
            dispatch(fetchingUser())
            const data = await loginUser({email, password})
            const user = data.user
            const username = data.user.username
            const user_id = data.user.user_id
            dispatch(fetchingUserSuccess({user_id, user, timestamp: Date.now()}))
            dispatch(closeModal())
            dispatch(formLogin())
            dispatch(authUser(user_id))
            return user_id
        } catch (error) {
            Error('error in loginUser', error)
        }
    }
}

export function logout(){
    return async function (dispatch) {
        let response = await logoutUser()
        console.log(response)
        dispatch({type: LOGOUT_USER})
    }
}

const userInitialState = fromJS({
    info: {
        username: '',
        user_id: '',
        email:''
    }
})

function user(state = userInitialState, action) {
    switch(action.type) {
        case FETCHING_USER_SUCCESS:
            return state.merge({
                info: fromJS(action.user)
            })
    }
}

const initialState = fromJS({
    isAuthed: false,
    isFetching: false,
    error: false,
    authId: '',
    spotifyAuthed: false,
    appLogin: false,
    username: ''
})

export default function users(state = initialState, action) {
    switch (action.type) {
        case AUTH_USER:
            return state.merge({
                isAuthed: true,
                authId: action.uid
            })
        case FETCHING_USER: {
            return state.merge({
                isFetching: true
            })
        }
        case FETCHING_USER_SUCCESS:
            return state.merge({
                isFetching: false,
                username: action.user.username,
                [action.user_id]: user(state.get(action.user_id), action)
            })
        case FORM_LOGIN:
            return state.merge({
                appLogin: true
            })
        case SPOTIFY_AUTH:
            return state.merge({
                isFetching: false,
                spotifyAuthed: true
            })
        case LOGOUT_USER:
            return state.merge({
                isAuthed: false,
                isFetching: false,
                authId: '',
                spotifyAuthed: false,
                appLogin: false
            })
        default:
            return state
    }
}