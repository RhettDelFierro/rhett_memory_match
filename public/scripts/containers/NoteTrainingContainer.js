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
            chosenNotePlayed: false
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

        var correct = true;

        if (note !== this.state.targetNote) {
            correct = false;
        }
        var newState = correct === false ? {
            keyMissed: update(this.state.keyMissed, {$push: [note]}),
            chosenNotePlayed: true,
            chosenNote: note,
            correct: correct,
            counter: update(this.state.counter, {$set: counter}),
            targetNote: targetNote
        } : {
            chosenNotePlayed: true,
            chosenNote: note,
            correct: correct,
            counter: update(this.state.counter, {$set: counter}),
            targetNote: targetNote
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
        console.log("componentwillmount");
        var counter = noteTestingFunctions.startTraining();
        var targetNote = noteTestingFunctions.getTargetNote(counter);
        this.setState({
            counter: counter,
            targetNote: targetNote
        })
    },
    render: function () {
        return <NoteTraining notes={this.state.counter}
                             onLoadTargetNote={this.handleLoadTargetNote}
                             onLoadChosenNote={this.handleLoadChosenNote}
                             correct={this.state.correct}
                             targetNote={this.state.targetNote}
                             chosenNote={this.state.chosenNote}
                             chosenNotePlayed={this.state.chosenNotePlayed}
                             targetNotePLayed={this.state.targetNotePlayed}/>
    }
});

module.exports = NoteTrainingContainer;