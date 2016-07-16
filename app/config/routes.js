import React from "react"
import { Router, Route, hashHistory, IndexRoute } from "react-router"
import { MainContainer, HomeContainer, PerfectPitchContainer,
    MemoryMatchContainer, ScoreboardContainer, NoteTrainingContainer } from 'containers'

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={MainContainer}>
            <IndexRoute component={HomeContainer}/>
            <Route path="perfect_pitch" component={PerfectPitchContainer}/>
            <Route path="memory_match" component={MemoryMatchContainer}/>
            <Route path="scoreboard" component={ScoreboardContainer}/>
            <Route path="perfect_pitch_training" component={NoteTrainingContainer}/>
        </Route>
    </Router>
)

export default routes