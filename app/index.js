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
import { routes } from 'config/routes'
import { hashHistory, applyRouterMiddleware, useRouterHistory } from 'react-router'
import { routerReducer, syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import createHashHistory from 'history/lib/createHashHistory'
import { useScroll } from 'react-router-scroll'

const routermiddle = routerMiddleware(hashHistory)

const store = createStore(
    combineReducers({...reducers, routing: routerReducer, form: formReducer}),
    compose(
        applyMiddleware(routermiddle, thunk),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
)

export const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
    <Provider store={store}>
        {routes(history)}
    </Provider>,
    document.getElementById('app'))