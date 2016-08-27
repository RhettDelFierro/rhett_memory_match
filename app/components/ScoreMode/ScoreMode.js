import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scoreActionCreators from 'redux/modules/scores'
import * as trainingActionCreators from 'redux/modules/training'
import { container } from './styles.css'
import { Map } from 'immutable'

export default function ScoreMode(props) {

    return (
        <div className={container} onClick={props.proceed}>
            <h3>Here is your score: <span>{props.score}</span></h3>
            <p>You are currently in {props.mode}</p>
            <Tally notesMissed={props.notesMissed}/>
            <h2>Click Here To Proceed</h2>
        </div>
    )
}

function Tally({notesMissed}) {
    return (
        <div>
            {notesMissed.valueSeq().map((count,note) => {
                return <p key={note}><span>{note}</span>    {count}</p>
            })}
        </div>
    )
}

ScoreMode.propTypes = {
    mode: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    proceed: PropTypes.func.isRequired,
    notesMissed: PropTypes.instanceOf(Map).isRequired
}