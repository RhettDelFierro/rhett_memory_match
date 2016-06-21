var React = require("react");
var Training = require("../components/Training");
var testingFunctions = require("../utils/testingFunctions");

var TrainingContainer = React.createClass({
    getInitialState: function () {
        return {
            inm: 0,
            scoresTest: {},
            chosen: ""
        }
    },
    componentDidMount: function () {
        this.setState({
            inm: this.props.location.query.score
        })
    },
    handleUpdateScores: function(testScores){
        //set state may need react-addon-update.
    },
    render: function () {
        var playNote = testingFunctions.loadNotes();
        //maybe depending which one they go to, render that.
        return (
            <Training playNote={playNote} scores={this.state.scoresTest} onUpdateScores={this.handleUpdateScores} chosen={this.state.chosen}/>
        )
    }
});

module.exports = TrainingContainer;