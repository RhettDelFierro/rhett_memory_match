import React, { Component } from "react"
import { PerfectPitch } from "scripts/components"

import { initializeStartPoint, getAverage, convertCents,
    playTargetNote, playStartingNote, playGuessNote, checkerSelection,
    getNotes } from "../../utils/noteFunctions"

import update from "react-addons-update"

class PerfectPitchContainer extends Component {
    constructor() {
        super();
        this.state = {
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
    }

    //ajax call to get audio.
    //increase and decrease cents.
    //play audio.

    componentDidMount() {
        //load the two notes to be used when this component is loaded:
        const notes = initializeStartPoint();
        this.makeNewCount(notes);
    }

    makeNewCount({counter, targetNote, startingNote}) {
        this.setState({
            counter: update(this.state.counter, {$set: counter}),
            targetNote,
            startingNote,
            guessesArray: [],
            average: 0
        })
    }

    handleControl(cents) {
        //increase/decrease cents from here.
        const totalCents = this.state.cents + (cents);
        const convertedFrequency = convertCents(totalCents, this.state.startingNote);
        this.setState({
            convertedFrequency: convertedFrequency,
            cents: totalCents
        });
    }

    //when they press "Begin" (or "Submit"?)
    handlePlayTarget() {
        //var counter = noteFunctions.keepCount(this.state.targetNote, this.state.startingNote, this.state.counter);
        if (this.state.guessesArray.length === 5) {
            const average = getAverage(this.state.guessesArray);
            this.setState({
                average: average,
                testingComplete: true
            });
        }

        if (this.state.targetNotePlayed === false) {
            playTargetNote(this.state.targetNote);
            this.setState({
                targetNotePlayed: true,
                startingNotePlayed: false
            });
        }
    }

    handlePlayStarting() {
        if (this.state.targetNotePlayed === true && this.state.startingNotePlayed === false) {
            playStartingNote(this.state.startingNote);
            this.setState({
                targetNotePlayed: false,
                startingNotePlayed: true
            })
        } else if (this.state.targetNotePlayed === false && this.state.startingNotePlayed === true) {
            playGuessNote(this.state.StartingNote, this.state.cents);
        }
    }

    handleSubmitNote() {
        const results = checkerSelection(this.state.targetNote, this.state.startingNote, this.state.cents);
        //switch statement to pass in the right array. The array will be based on this.state.targetNote.
        const { targetNote, startingNote, counter } = getNotes(this.state.targetNote, this.state.startingNote, this.state.counter);
        this.setState({
            targetNote,
            startingNote,
            guessesArray: update(this.state.guessesArray, {$push: [results]}),
            targetNotePlayed: false,
            startingNotePlayed: false,
            counter: update(this.state.counter, {$set: counter}),
            cents: 0
        });
    }

    render() {
        //accuracy will give how many half-notes the user was off.
        return (
            <PerfectPitch onControl={(cents) => this.handleControl(cents)} onPlayStarting={() => this.handlePlayStarting()}
                          onPlayTarget={() => this.handlePlayTarget()} onSubmitNote={() => this.handleSubmitNote ()}
                          score={this.state.average}
                          testingComplete={this.state.testingComplete}/>
        )
    }
}

export default PerfectPitchContainer;