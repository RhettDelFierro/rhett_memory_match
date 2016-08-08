import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scoreActionCreators from 'redux/modules/scores'
import * as trainingActionCreators from 'redux/modules/training'
import { container } from './styles.css'

function ScoreMode(props) {
    console.log('ScoreMode props', props)
    //maybe we need a container to help with navigation?

    //onclick should go to the next link or back to the same route but different mode.
    //maybe do that in a thunk?
    return (
        <div className={container} onClick={props.proceed}>
            <h3>Here is your score: <span>{props.score}</span></h3>
            <p>You are currently in {props.mode}</p>
            <p>Note most missed: </p>
            <h2>Click Here To Proceed</h2>
        </div>
    )
}

ScoreMode.proptTypes = {
    mode: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    proceed: PropTypes.func.isRequired
}

function mapStateToProps({training, scores}) {
    return {
        roundCompleted: training.get('roundCompleted'),
        mode: training.get('mode'),
        //SHOULD BE THE SCORE FROM SCORES REDUCER?
        score: training.get('score')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...scoreActionCreators, ...trainingActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreMode)