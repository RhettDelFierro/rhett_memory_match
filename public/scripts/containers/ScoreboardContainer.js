var React = require("react");
var Scoreboard = require("../components/Scoreboard");

var ScoreboardContainer = React.createClass({
    render: function(){
        return (
            <Scoreboard />
        )
    }
});

module.exports = ScoreboardContainer;