var React = require("react");
var Training = require("../components/Training");
var noteTestingFunctions = require("../utils/noteTestingFunctions");

var TrainingContainer = React.createClass({
    getInitialState: function () {
        return {
            inm: 0,
            scoresTest: {},
            chosen: "",
            counter: []
        }
    },
    componentDidMount: function () {
        var counter = noteTestingFunctions.startTraining();
        this.setState({
            inm: this.props.location.query.score,
            counter: counter
        })
    },
    handleUpdateScores: function(testScores){
        //set state may need react-addon-update.
    },
    render: function () {
        //maybe depending which one they go to, render that.
        var playNotes = noteTestingFunctions.loadNotes();
        return (
            <Training counter={this.state.counter} playNotes={playNotes} scores={this.state.scoresTest}/>
        )
    }
});

module.exports = TrainingContainer;