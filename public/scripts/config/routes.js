var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var MainContainer = require('../containers/MainContainer');
var HomeContainer = require('../containers/HomeContainer');
var PerfectPitchContainer = require("../containers/PerfectPitchContainer");
var MemoryMatchContainer = require("../containers/MemoryMatchContainer");
var ScoreboardContainer = require("../containers/ScoreboardContainer");
var TrainingContainer = require("../containers/TrainingContainer");

var routes = (
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

module.exports = routes;