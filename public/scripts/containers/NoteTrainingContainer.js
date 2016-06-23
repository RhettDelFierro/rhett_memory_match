import React from "react"
import NoteTraining from "../components/NoteTraining"
import update from "react-addons-update"
import { maskingNotes, makeNoise, getTargetNote,
    increaseCount, startTraining} from "../utils/noteTestingFunctions"

const NoteTrainingContainer = React.createClass({
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

        var newArray = maskingNotes(this.state.counter);
        setTimeout(function(){
            newArray.map(function(item){
                this.handlePlayNote(item,2)
            }.bind(this))
        }.bind(this),1500);

        makeNoise();
    },
    handleLoadChosenNote: function (note, seconds) {
        this.handlePlayNote(note, 1);
        //new target note for next round. gets random note.
        var targetNote = getTargetNote(this.state.counter);
        //in that random notes function, when all have been played five times, it'll return "Finished".
        if (targetNote === "Finished"){
            console.log(this.state.keysMissed);
            this.setState({
                testingComplete: true
            })
        }
        //increases the count fo reach note.
        var counter = increaseCount(this.state.targetNote, this.state.counter);
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
        var counter = startTraining();
        var targetNote = getTargetNote(counter);
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

export default NoteTrainingContainer