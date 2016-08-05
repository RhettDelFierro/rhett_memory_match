import React from "react"
import { Router, Route, IndexRoute } from "react-router"
import { MainContainer, HomeContainer, PerfectPitchContainer,
    MemoryMatchContainer, ScoreboardContainer, NoteTrainingContainer,
    PreTestContainer, PostTestContainer } from 'containers'
import { syncHistoryWithStore } from 'react-router-redux'
import { history } from 'index'

const routes = (
    <Router history={history}>
        <Route path="/" component={MainContainer}>
            <IndexRoute component={HomeContainer}/>
            <Route path="perfect_pitch" component={PerfectPitchContainer}/>
            <Route path="memory_match" component={MemoryMatchContainer}/>
            <Route path="scoreboard" component={ScoreboardContainer}/>
            <Route path="perfect_pitch_training" component={NoteTrainingContainer} />
            <Route path="perfect_pitch_pretest" component={PreTestContainer} />
            <Route path="perfect_pitch_posttest" component={PostTestContainer} />
        </Route>
    </Router>
)

export default routes