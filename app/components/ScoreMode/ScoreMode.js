import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scoreActionCreators from 'redux/modules/scores'
import * as trainingActionCreators from 'redux/modules/training'
import { scoreModeContainer, info, proceed, error, content } from './styles.css'
import { Map } from 'immutable'
import { TallyForm } from 'components'
import { SongListContainer } from 'containers'


export default function ScoreMode(props) {

    return (
        <div className={scoreModeContainer}>
            <div className={info}>
                <h3>Here is your score: <span>{props.score}</span></h3>
                <p>You are currently in {props.mode}</p>
            </div>
                {!props.fetchingSongs
                    ? <SongListContainer />
                    : <TallyForm />
                }
            <div className={proceed} onClick={props.proceed}>PROCEED</div>
        </div>
    )
}

ScoreMode.propTypes = {
    mode: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    proceed: PropTypes.func.isRequired,
    notesMissed: PropTypes.instanceOf(Map).isRequired
}