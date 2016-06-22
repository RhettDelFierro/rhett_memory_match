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
            counter: update(this.state.counter, {$set: counter})
        } : {
            chosenNotePlayed: true,
            chosenNote: note,
            correct: correct,
            counter: update(this.state.counter, {$set: counter})
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
    componentWillUpdate: function () {
        this.handleGuess();
    },
    componentDidMount: function () {
        var targetNote = noteTestingFunctions.getTargetNote(this.props.counter);
        this.setState({
            counter: this.props.counter,
            targetNote: targetNote
        })
    },
    render: function () {
        return <NoteTraining notes={this.props.counter}
                             onLoadTargetNote={this.handleLoadTargetNote}
                             onLoadChosenNote={this.handleLoadChosenNote}
                             correct={this.state.correct}
                             targetNote={this.state.targetNote}
                             chosenNote={this.state.chosenNote}/>
    }
});

module.exports = NoteTrainingContainer;