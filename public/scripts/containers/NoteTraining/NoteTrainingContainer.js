import React, { Component } from "react"
import { NoteTraining } from "scripts/components"
//import { maskingNotes, makeNoise, getTargetNote,
//    increaseCount, startTraining} from "../../utils/noteTestingFunctions"

class NoteTrainingContainer extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <NoteTraining />
        )
    }
}

export default NoteTrainingContainer