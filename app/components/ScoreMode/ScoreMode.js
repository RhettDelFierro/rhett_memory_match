import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scoreActionCreators from 'redux/modules'
import { container } from './styles.css'

function ScoreMode(props) {
    console.log('ScoreMode props', props)
    //maybe we need a container to help with navigation?

    //onclick should go to the next link or back to the same route but different mode.
    //maybe do that in a thunk?
    return (
        <div className={container} onClick={this.props.proceed}>
            <h3>Here is your score: <span>{this.props.score}</span></h3>
            <p>You are currently in {this.props.mode}</p>
            <p>Note most missed: </p>
            <h2>Click Here To Proceed</h2>
        </div>
    )
}

ScoreMode.proptTypes = {
    completed: PropTypes.bool.isRequired,
    roundsCompleted: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    setPretest: PropTypes.func.isRequired,
    setTraining: PropTypes.func.isRequired,
    setPosttest: PropTypes.func.isRequired,
    proceed: PropTypes.func.isRequired
}

function mapStateToProps({training}) {
    return {
        completed: training.get('completed'),
        mode: training.get('mode'),
        //SHOULD BE THE SCORE FROM SCORES REDUCER?
        score: training.get('score')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scoreActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreMode)