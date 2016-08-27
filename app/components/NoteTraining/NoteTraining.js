import React, { Component, PropTypes } from "react"
import { NoteContainer, CounterContainer, VolumeControlContainer, ScoreModeContainer } from 'containers'
import { container, start } from './styles.css'

export default function NoteTraining(props) {
    //<NoteContainer />
    return props.roundCompleted === true
        ? <Score {...props}/>
        : <Game {...props}/>
}

function Game(props){
    let containerClass = props.start ? `${container} ${start}` : `${container}`
    return (
        <div className={containerClass}>
            <CounterContainer />
            <NoteContainer />
            <VolumeControlContainer />
        </div>
    )
}

function Score(props){
    return (
        <div className={container}>
            <ScoreModeContainer />
        </div>
    )
}

NoteTraining.propTypes = {
    start: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired,
    roundCompleted: PropTypes.bool.isRequired
}