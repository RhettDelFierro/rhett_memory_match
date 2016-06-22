var React = require("react");
var NoteTraining = require("../components/NoteTraining");
var noteTestingFunctions = require("../utils/noteTestingFunctions");
var update = require("react-addons-update");

var NoteTrainingContainer = React.createClass({
    getInitialState: function () {
        return {
            counter: [],
            score: 0,
            keyMissed: [],
            targetNote: "",
            chosenNote: "",
            targetNotePlayed: false,
            chosenNotePlayed: false,
            cacheTargetNote: ""
        }
    },
    handlePlayNote: function (note) {
        this.props.playNotes(note);
    },
    handleLoadTargetNote: function (note) {
        this.handlePlayNote(note);
        this.setState({
            targetNote: note,
            targetNotePlayed: true
        })
    },
    handleLoadChosenNote: function (note) {
        this.handlePlayNote(note);
        var targetNote = noteTestingFunctions.getTargetNote(this.state.counter);
        var counter = noteTestingFunctions.increaseCount(this.state.targetNote, this.state.counter);
        var cacheCurrentTargetNote = this.state.targetNote;
        var correct = true;

        if (note !== this.state.targetNote) {
            correct = false;
            setTimeout(function () {
                this.handlePlayNote(cacheCurrentTargetNote)
            }.bind(this), 1500)
        }
        var newState = correct === false ? {
            keyMissed: update(this.state.keyMissed, {$push: [note]}),
            chosenNotePlayed: true,
            chosenNote: note,
            correct: correct,
            counter: update(this.state.counter, {$set: counter}),
            targetNote: targetNote,
            cacheTargetNote: cacheCurrentTargetNote
        } : {
            chosenNotePlayed: true,
            chosenNote: note,
            correct: correct,
            counter: update(this.state.counter, {$set: counter}),
            targetNote: targetNote,
            cacheTargetNote: cacheCurrentTargetNote
        };
        this.setState(newState)
    },
    handleGuess: function () {
        if (this.state.chosenNotePlayed === true && this.state.chosenNotePlayed === true) {
            if (!this.state.correct) {
                this.handlePlayNote(this.state.targetNote);
                this.setState({
                    targetNotePlayed: false,
                    chosenNotePlayed: false
                })
            } else this.setState({
                correct: true,
                targetNotePlayed: false,
                chosenNotePlayed: false
            })
        }
    },
    componentWillMount: function () {
        var counter = noteTestingFunctions.startTraining();
        var targetNote = noteTestingFunctions.getTargetNote(counter);
        this.setState({
            counter: counter,
            targetNote: targetNote
        })
    },
    render: function () {
        return <NoteTraining onLoadTargetNote={this.handleLoadTargetNote}
                             correct={this.state.correct}
                             targetNote={this.state.targetNote}
                             chosenNote={this.state.chosenNote}
                             cacheTargetNote={this.state.cacheTargetNote}

                             notes={this.state.counter}

                             onLoadChosenNote={this.handleLoadChosenNote}/>
    }
});

module.exports = NoteTrainingContainer;