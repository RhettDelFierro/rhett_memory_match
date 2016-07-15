import React, { Component } from "react"
import { NoteContainer } from 'containers'
import { noteTrainingContainer } from './styles.css'

function NoteTraining(props) {
        //<NoteContainer />
    return (
        <div className={noteTrainingContainer}>
            <NoteContainer />
        </div>
    )
}

export default NoteTraining