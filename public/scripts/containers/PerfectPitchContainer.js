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
            targetNoteGb: [],
            targetNoteG: [],
            targetNoteAb: [],
            targetNoteA: []
        }
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
    //when they press "Begin" (or "Submit"?)
    handlePlayTarget: function () {
        this.keepCount();
        //var counter = noteFunctions.keepCount(this.state.targetNote, this.state.startingNote, this.state.counter);
        if (this.state.guessesArray.length === 64){
            var initialValue = 0;
            var reducer = function (accumulator, item) {
                return accumulator + item
            };
            var total = this.state.guessesArray.reduce(reducer, initialValue);
            var average = total / this.state.guessesArray.length;
            alert("game finished", average);
        }


        if (this.state.targetNotePlayed === false) {
            noteFunctions.playTargetNote(this.state.targetNote);
            this.setState({
                targetNotePlayed: true,
                startingNotePlayed: false
            })
        }
    },
    handlePlayStarting: function () {
        if (this.state.targetNotePlayed === true) {
            noteFunctions.playStartingNote(this.state.startingNote);
            this.setState({
                targetNotePlayed: false,
                startingNotePlayed: true
            })
        }
    },
    handleSubmitNote: function () {
        var results = noteFunctions.checkerSelection(this.state.targetNote, this.state.startingNote, this.state.cents);
        var newNotes = noteFunctions.getNotes(this.state.counter);
        this.setState({
            targetNote: newNotes.targetNote,
            startingNote: newNotes.startingNote,
            guessesArray: update(this.state.guessesArray, {$push: [results]})
        });
        //maybe on component did update: if this.state.guessesArray === 64
    },
    handleSubmiteNew: function(){
        var results = noteFunctions.checkerSelection(this.state.targetNote, this.state.startingNote, this.state.cents);
        var newNotes = noteFunctions.getNotes(this.state.counter);
    },
    componentDidMount: function () {
        //load the two notes to be used when this component is loaded:
        var notes = noteFunctions.initializeStartPoint();
        this.makenewCount(notes);
    },
    makeNewCount: function(notes){
        switch (notes.targetNote) {
            case "F#/Gb":
                this.setState({
                    targetNote: notes.targetNote,
                    startingNote: notes.startingNote,
                    targetNoteGb: update(this.state.targetNoteGb, {$push: [notes.startingNote]})
                });
                break;
            case "G":
                this.setState({
                    targetNote: notes.targetNote,
                    startingNote: notes.startingNote,
                    targetNoteG: update(this.state.targetNoteG, {$push: [notes.startingNote]})
                });
                break;
            case "G#/Ab":
                this.setState({
                    targetNote: notes.targetNote,
                    startingNote: notes.startingNote,
                    targetNoteAb: update(this.state.targetNoteAb, {$push: [notes.startingNote]})
                });
                break;
            case "A":
                this.setState({
                    targetNote: notes.targetNote,
                    startingNote: notes.startingNote,
                    targetNoteA: update(this.state.targetNoteA, {$push: [notes.startingNote]})
                });
                break;
        }
    },
    render: function () {
        //accuracy will give how many half-notes the user was off.
        return (
            <PerfectPitch onControl={this.handleControl} onPlayStarting={this.handlePlayStarting}
                          onPlayTarget={this.handlePlayTarget} onSubmitNote = {this.handleSubmitNote}/>
        )
    }
});

module.exports = PerfectPitchContainer;