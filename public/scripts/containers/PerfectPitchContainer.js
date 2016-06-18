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
            targetNotePlayed: false,
            cents: 0,
            accuracy: 0,
            counter: {},
            guesses: 0,
            startingNote: "",
            answer: false,
            guessesArray: [],
            startingNotePlayed: false
        }
    },
    handleControl: function (cents) {
        //increase/decrease cents from here.
        var totalCents = this.state.cents + (cents);
        console.log("here's totalCents: ", this.state.cents, "here's the cents we're passing in:", cents);
        noteFunctions.convertCents(totalCents, this.state.startingNote);
        this.setState({
            cents: totalCents
        });
    },
    //when they press "Begin" (or "Submit"?)
    handlePlayTarget: function () {
        var counter = noteFunctions.keepCount(this.state.targetNote, this.state.startingNote, this.state.counter);
        if (this.state.targetNotePlayed === false) {
            noteFunctions.playTargetNote(this.state.targetNote);
            this.setState({
                targetNotePlayed: true
            })
        }
    },
    keepCount: function(){
        var counter = noteFunctions.keepCount(this.state.targetNote, this.state.startingNote, this.counter);
        this.setState({
            counter: counter
        })
    },
    handlePlayStarting: function(){
        noteFunctions.playStartingNote(this.state.startingNote);
        this.setState({
            targetNotePlayed: false,
            startingNotePlayed: true
        })
    },
    handleSubmit: function () {
        var results = noteFunctions.checkerSelection(this.state.targetNote, this.state.startingNote);
        var counter = noteFunctions.getNotes(this.state.counter);
        this.setState({
            guessesArray: update(this.state.guessesArray, {$push: [results]})
        });
        //maybe on component did update: if this.state.guessesArray === 64
    },
    componentDidMount: function () {
        //load the two notes to be used when this component is loaded:
        var notes = noteFunctions.initializeStartPoint();
        this.setState({
            targetNote: notes.targetNote,
            startingNote: notes.startingNote
        });
    },
    render: function () {
        //accuracy will give how many half-notes the user was off.
        return (
            <PerfectPitch onControl={this.handleControl} onPlayStarting={this.handlePlayStarting} onPlayTarget={this.handlePlayTarget} accuracy={this.state.accuracy}/>
        )
    }
});

module.exports = PerfectPitchContainer;