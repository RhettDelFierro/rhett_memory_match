var React = require("react");
var PerfectPitch = require("../components/PerfectPitch");
var noteFunctions = require("../utils/noteFunctions");

var PerfectPitchContainer = React.createClass({
    //ajax call to get audio.
    //increase and decrease cents.
    //play audio.
    getInitialState: function () {
        return {
            targetNote: "",
            cents: 0,
            accuracy: 0
        }
    },
    handleControl: function (type) {
        //increase/decrease cents from here.
        this.setState({
            cents: this.state.cents + (type)
        })
    },
    handlePlay: function () {
        userFunctions.playNote()
    },
    handleSubmit: function () {
        noteFunctions.checkerSelection()
    },
    componentWillUpdate: function () {
        //after the user Submits.
        this.handlePlay();
    },
    render: function () {
        //accuracy will give how many half-notes the user was off.
        return (
            <PerfectPitch accuracy={this.state.accuracy}/>
        )
    }
});

module.exports = PerfectPitchContainer;