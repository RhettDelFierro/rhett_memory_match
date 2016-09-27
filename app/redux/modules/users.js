import { fromJS, Map } from 'immutable'
import { registerUser, loginUser, logoutUser } from 'utils/userFunctions'
import { closeModal } from 'redux/modules/modal'
import { closeNavModal } from 'redux/modules/navModal'
import { push, goBack } from 'react-router-redux'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const LOGOUT_USER = 'LOGOUT_USER'
const SPOTIFY_AUTH = 'SPOTIFY_AUTH'
const FORM_LOGIN = 'FORM_LOGIN'
const SET_LAST_ROUTE = 'SET_LAST_ROUTE'

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
    return async function (dispatch,getState) {
        try {
            dispatch(fetchingUser())
            const data = await registerUser({username, email, password})
            const user_id = data.user.user_id
            const user = data.user
            //I want to clean some of this.
            //Possibly take care of a lot of it in fetchingUserSuccess()?
            dispatch(fetchingUserSuccess({user_id, user, timestamp: Date.now()}))
            dispatch(closeModal())
            dispatch(closeNavModal())
            dispatch(formLogin())
            dispatch(authUser(user_id))
            dispatch(push(goBack() || '/'))
            return user_id
        } catch (error) {
            Error('error in registerUser', error)
        }
    }
}

export function login({email, password}) {
    return async function (dispatch,getState) {
        try {
            dispatch(fetchingUser())
            const data = await loginUser({email, password})
            const user = data.user
            const username = data.user.username
            const user_id = data.user.user_id
            //I want to clearn some of this.
            dispatch(fetchingUserSuccess({user_id, user, timestamp: Date.now()}))
            dispatch(closeModal())
            dispatch(closeNavModal())
            dispatch(formLogin())
            dispatch(authUser(user_id))
            dispatch(push(push(goBack() || '/')))
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

//putting the last route user visited here if they have to auth/re-auth
//this will take them back to the route they were previously on.
//will handle this here until I find out how to do it in
//react-router/react-router-redux
export function setLastRoute({ lastRoute }) {
    return {
        type: SET_LAST_ROUTE,
        lastRoute
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
                info: new Map(action.user)
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
    username: '',
    lastRoute: '/'
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
        case SET_LAST_ROUTE:
            return state.merge({
                lastRoute: action.lastRoute
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