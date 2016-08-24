import React from 'react'
import ReactDOM from 'react-dom'
import routes from 'config/routes'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
//import { checkIfAuthed } from 'helpers/auth'
import * as reducers from 'redux/modules'
import { routerReducer, syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router'
import {reducer as formReducer} from 'redux-form'
import { toJS } from 'immutable'

const routermiddle = routerMiddleware(hashHistory)

const store = createStore(
    combineReducers({...reducers, routing: routerReducer, form: formReducer}),
    compose(
        applyMiddleware(thunk, routermiddle),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
)

export const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('app'))