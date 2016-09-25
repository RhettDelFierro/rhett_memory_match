import React from "react"
import { Router, Route, IndexRoute } from "react-router"
import { MainContainer, HomeContainer, PerfectPitchContainer,
    MemoryMatchContainer, ScoreboardContainer, NoteTrainingContainer } from 'containers'
import { LoginPage } from 'components'
import { syncHistoryWithStore } from 'react-router-redux'
//import { history } from 'index'

function routes(authCheck, history,render) {
    return (
        <Router history={history} render={render}>
            <Route path="/" component={MainContainer}>
                <IndexRoute component={HomeContainer}/>
                <Route path="perfect_pitch" component={PerfectPitchContainer}/>
                <Route path="memory_match" component={MemoryMatchContainer}/>
                <Route path="scoreboard" component={ScoreboardContainer}/>
                <Route path="perfect_pitch_training" component={NoteTrainingContainer} onEnter={authCheck}/>
                <Route path="login" component={LoginPage}/>
            </Route>
        </Router>
    )
}

export default routes