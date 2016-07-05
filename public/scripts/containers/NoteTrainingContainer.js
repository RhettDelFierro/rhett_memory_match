import React, { Component } from "react"
import NoteTraining from "../components/NoteTraining"
import update from "react-addons-update"
import { maskingNotes, makeNoise, getTargetNote,
    increaseCount, startTraining} from "../utils/noteTestingFunctions"

class NoteTrainingContainer extends Component {
    constructor() {
        super();
        this.state = {
            counter: [],
            score: 0,
            keysMissed: [],
            targetNote: "",
            chosenNote: "",
            targetNotePlayed: false,
            chosenNotePlayed: false,
            cacheTargetNote: "",
            testingComplete: false,
            guesses: 0
        }
    }

    handlePlayNote(note, seconds, volume) {
        this.props.playNotes(note, seconds, volume);
    }

    handleLoadTargetNote(note) {
        //play the selected note.
        this.handlePlayNote(note, 1, 1);


        //set the state.
        this.setState({
            targetNote: note,
            targetNotePlayed: true
        });
    }

    handleMaskingNotes() {

        let newArray = maskingNotes(this.state.counter);

        setTimeout(() => newArray.map((item) => this.handlePlayNote(item, 2, 0.05)), 1500);
        makeNoise();
    }

    handleLoadChosenNote(note) {
        //new target note for next round. gets random note.
        const targetNote = getTargetNote(this.state.counter);
        //in that random notes function, when all have been played five times, it'll return "Finished".
        if (targetNote === "Finished") {
            this.setState({
                testingComplete: true
            });
            console.log(this.state.counter);
        }
        console.log(this.state.guesses +1);
        //increases the count fo reach note.
        const counter = increaseCount(this.state.targetNote, this.state.counter);
        //because we're about to change state and need the note that was last played, we'll cache this current target note.
        const cacheCurrentTargetNote = this.state.targetNote;

        let correct = true;

        //checking for match.
        if (note !== this.state.targetNote) {
            correct = false;
            //wait for 1.5 seconds to play what the correct note sounds like.
            //maybe start using promises?
            this.handlePlayNote(cacheCurrentTargetNote, 1, 1);
            this.handleMaskingNotes();
        }

        //set the state based on if the two notes matches.
        let newState = correct === false ? {
            chosenNotePlayed: true,
            chosenNote: note,
            correct,
            counter: update(this.state.counter, {$set: counter}),
            targetNote,
            cacheTargetNote: cacheCurrentTargetNote,
            keysMissed: update(this.state.keysMissed, {$push: [cacheCurrentTargetNote]}),
            guesses: this.state.guesses +1
        } : {
            chosenNotePlayed: true,
            chosenNote: note,
            correct,
            counter: update(this.state.counter, {$set: counter}),
            targetNote,
            guesses: this.state.guesses +1
        };
        this.setState(newState)
    }

    componentWillMount() {
        const counter = startTraining();
        const targetNote = getTargetNote(counter);
        this.setState({
            counter,
            targetNote
        })
    }

    render() {
        return <NoteTraining onLoadTargetNote={(note) => this.handleLoadTargetNote(note)}
                             correct={this.state.correct}
                             targetNote={this.state.targetNote}
                             chosenNote={this.state.chosenNote}
                             cacheTargetNote={this.state.cacheTargetNote}

                             notes={this.state.counter}
                             testingComplete={this.state.testingComplete}
                             keysMissed={this.state.keysMissed}

                             onLoadChosenNote={(note) => this.handleLoadChosenNote(note)}/>
    }
}

export default NoteTrainingContainer