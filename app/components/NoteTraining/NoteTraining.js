import React, { Component, PropTypes } from "react"
import { NoteContainer, CounterContainer, VolumeControlContainer } from 'containers'
import { container, start } from './styles.css'

export default function NoteTraining(props) {
    //<NoteContainer />
    let containerClass = props.start ? `${container} ${start}` : `${container}`
    return (
        <div className={containerClass}>
            <CounterContainer />
            <NoteContainer />
            <VolumeControlContainer />
        </div>
    )
}

NoteTraining.propTypes = {
    start: PropTypes.bool.isRequired
}