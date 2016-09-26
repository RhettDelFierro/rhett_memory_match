import React from 'react'
import ReactDOM from 'react-dom'
import { toJS } from 'immutable'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import * as reducers from 'redux/modules'

import {reducer as formReducer} from 'redux-form'

//react-router
//import routes from 'config/routes'
import routes from 'config/routes'
import { hashHistory, applyRouterMiddleware, useRouterHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import createHashHistory from 'history/lib/createHashHistory'
import { useScroll } from 'react-router-scroll'
import { setLastRoute } from 'redux/modules/users'

const routermiddle = routerMiddleware(hashHistory)
const render = applyRouterMiddleware(useScroll())

const store = createStore(
    combineReducers({...reducers, routing: routerReducer, form: formReducer}),
    compose(
        applyMiddleware(routermiddle, thunk),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
)

export const history = syncHistoryWithStore(hashHistory, store)

//these arguments are what react-router will give to this function when it sees the onEnter prop.
function authCheck(nextState, replace) {
    if (store.getState().users.get('isFetching') === true) {
        return
    }
    const authed = store.getState().users.get('isAuthed')
    const nextPathName = nextState.location.pathname
    if (authed !== true) {
        store.dispatch(setLastRoute({ lastRoute: nextPathName }))
        replace('/login')
    }

}

ReactDOM.render(
    <Provider store={store}>
        {routes(authCheck, history, render)}
    </Provider>,
    document.getElementById('app'))