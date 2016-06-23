var React = require("react");
var NoteTraining = require("../components/NoteTraining");
var noteTestingFunctions = require("../utils/noteTestingFunctions");
var update = require("react-addons-update");

var NoteTrainingContainer = React.createClass({
    getInitialState: function () {
        return {
            counter: [],
            score: 0,
            keysMissed: [],
            targetNote: "",
            chosenNote: "",
            targetNotePlayed: false,
            chosenNotePlayed: false,
            cacheTargetNote: "",
            testingComplete: false
        }
    },
    handlePlayNote: function (note, seconds) {
        this.props.playNotes(note,seconds);
    },
    handleLoadTargetNote: function (note, seconds) {
        //play the selected note.
        this.handlePlayNote(note,1);

        //masking notes
        this.handleMaskingNotes();

        //set the state.
        this.setState({
            targetNote: note,
            targetNotePlayed: true
        });
    },
    handleMaskingNotes(){

        var newArray = noteTestingFunctions.maskingNotes(this.state.counter);
        setTimeout(function(){
            newArray.map(function(item){
                this.handlePlayNote(item,2)
            }.bind(this))
        }.bind(this),1500);

        noteTestingFunctions.makeNoise();
    },
    handleLoadChosenNote: function (note, seconds) {
        this.handlePlayNote(note, 1);
        //new target note for next round. gets random note.
        var targetNote = noteTestingFunctions.getTargetNote(this.state.counter);
        //in that random notes function, when all have been played five times, it'll return "Finished".
        if (targetNote === "Finished"){
            console.log(this.state.keysMissed);
            this.setState({
                testingComplete: true
            })
        }
        //increases the count fo reach note.
        var counter = noteTestingFunctions.increaseCount(this.state.targetNote, this.state.counter);
        //because we're about to change state and need the note that was last played, we'll cache this current target note.
        var cacheCurrentTargetNote = this.state.targetNote;

        var correct = true;

        //checking for match.
        if (note !== this.state.targetNote) {
            correct = false;
            //wait for 1.5 seconds to play what the correct note sounds like.
            setTimeout(function () {
                this.handlePlayNote(cacheCurrentTargetNote, 1)
            }.bind(this), 1500)
        }

        //set the state based on if the two notes matches.
        var newState = correct === false ? {
            chosenNotePlayed: true,
            chosenNote: note,
            correct: correct,
            counter: update(this.state.counter, {$set: counter}),
            targetNote: targetNote,
            cacheTargetNote: cacheCurrentTargetNote,
            keysMissed: update(this.state.keysMissed, {$push: [cacheCurrentTargetNote]})
        } : {
            chosenNotePlayed: true,
            chosenNote: note,
            correct: correct,
            counter: update(this.state.counter, {$set: counter}),
            targetNote: targetNote
        };
        this.setState(newState)
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
                             testingComplete={this.state.testingComplete}
                             keysMissed={this.state.keysMissed}

                             onLoadChosenNote={this.handleLoadChosenNote}/>
    }
});

module.exports = NoteTrainingContainer;