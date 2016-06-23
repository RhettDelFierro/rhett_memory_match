import React from "react"
import { Router, Route, hashHistory, Index Route } from "react-router"
import MainContainer from '../containers/MainContainer'
import HomeContainer from '../containers/HomeContainer'
import PerfectPitchContainer from '../containers/PerfectPitchContainer'
import MemoryMatchContainer from '../containers/MemoryMatchContainer'
import ScoreboardContainer from "../containers/ScoreboardContainer"
import TrainingContainer from "../containers/TrainingContainer"

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={MainContainer}>
            <IndexRoute component={HomeContainer} />
            <Route path="perfect_pitch" component={PerfectPitchContainer}/>
            <Route path="memory_match" component={MemoryMatchContainer}/>
            <Route path="scoreboard" component={ScoreboardContainer}/>
            <Route path="perfect_pitch_training" component={TrainingContainer}/>
        </Route>
    </Router>
);

export default routes