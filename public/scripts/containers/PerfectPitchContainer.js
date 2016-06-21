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
            startingNote: "",
            guessesArray: [],
            startingNotePlayed: false,
            convertedFrequency: 0,
            counter: [],
            average: 0,
            testingComplete: false
        }
    },
    componentDidMount: function () {
        //load the two notes to be used when this component is loaded:
        var notes = noteFunctions.initializeStartPoint();
        this.makeNewCount(notes);
    },
    makeNewCount: function (notes) {
        this.setState({
            counter: update(this.state.counter, {$set: notes.counter}),
            targetNote: notes.targetNote,
            startingNote: notes.startingNote,
            guessesArray: [],
            average: 0
        })
    },
    handleControl: function (cents) {
        //increase/decrease cents from here.
        var totalCents = this.state.cents + (cents);
        var convertedFrequency = noteFunctions.convertCents(totalCents, this.state.startingNote);
        this.setState({
            convertedFrequency: convertedFrequency,
            cents: totalCents
        });
    },
    componentWillUpdate: function () {
    },
    //when they press "Begin" (or "Submit"?)
    handlePlayTarget: function () {
        //var counter = noteFunctions.keepCount(this.state.targetNote, this.state.startingNote, this.state.counter);
        if (this.state.guessesArray.length === 5) {
            var average = noteFunctions.getAverage(this.state.guessesArray);
            this.setState({
                average: average,
                testingComplete: true
            });
        }
        console.log("number of guesses: ", this.state.guessesArray.length);

        if (this.state.targetNotePlayed === false) {
            noteFunctions.playTargetNote(this.state.targetNote);
            this.setState({
                targetNotePlayed: true,
                startingNotePlayed: false
            });
        }
    },
    handlePlayStarting: function () {
        if (this.state.targetNotePlayed === true && this.state.startingNotePlayed === false) {
            noteFunctions.playStartingNote(this.state.startingNote);
            this.setState({
                targetNotePlayed: false,
                startingNotePlayed: true
            })
        } else if (this.state.targetNotePlayed === false && this.state.startingNotePlayed === true) {
            noteFunctions.playGuessNote(this.state.StartingNote, this.state.cents);
        }
    },
    handleSubmitNote: function () {
        var results = noteFunctions.checkerSelection(this.state.targetNote, this.state.startingNote, this.state.cents);
        //switch statement to pass in the right array. The array will be based on this.state.targetNote.
        var newNotes = noteFunctions.getNotes(this.state.targetNote, this.state.startingNote, this.state.counter);
        this.setState({
            targetNote: newNotes.targetNote,
            startingNote: newNotes.startingNote,
            guessesArray: update(this.state.guessesArray, {$push: [results]}),
            targetNotePlayed: false,
            startingNotePlayed: false,
            counter: update(this.state.counter, {$set: newNotes.counter}),
            cents: 0
        });
    },
    render: function () {
        //accuracy will give how many half-notes the user was off.
        return (
            <PerfectPitch onControl={this.handleControl} onPlayStarting={this.handlePlayStarting}
                          onPlayTarget={this.handlePlayTarget} onSubmitNote={this.handleSubmitNote}
                          score={this.state.average}
                          testingComplete={this.state.testingComplete}/>
        )
    }
});

module.exports = PerfectPitchContainer;