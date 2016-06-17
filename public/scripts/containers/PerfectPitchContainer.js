var React = require("react");
var PerfectPitch = require("../components/PerfectPitch");
var noteFunctions = require("../utils/noteFunctions");
var update = require("react-addons-update");

var PerfectPitchContainer = React.createClass({
    //ajax call to get audio.
    //increase and decrease cents.
    //play audio.
    getInitialState: function () {
        return {
            targetNote: "",
            cents: 0,
            accuracy: 0,
            counter: {},
            guesses: 0,
            startingNote: "",
            answer: false,
            guessesArray: []
        }
    },
    handleControl: function (type) {
        //increase/decrease cents from here.
        this.setState({
            cents: this.state.cents + (type)
        })
    },
    handlePlayTarget: function () {
        if (this.state.guessesArray.length < 65) {
            var note = noteFunctions.playTargetNote();
            this.setState({
                targetNote: note,
                cents: 0
            })
        } else if (this.state.guessesArray.length === 64){
            alert("game finished");
        }
    },
    keepCount: function(){
        var counter = noteFunctions.keepCount(this.state.targetNote, this.state.startingNote, this.counter);
        this.setState({
            counter: counter
        })
    },
    handlePlayStarting: function(){
        var note = noteFunctions.playStartingNote();
        this.setState({
            startingNote: note
        })
    },
    handleSubmit: function () {
        var results = noteFunctions.checkerSelection(this.state.targetNote, this.state.startingNote);
        this.setState({
            guessesArray: update(this.state.guessesArray, {$push: [results]})
        })
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