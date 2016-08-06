import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

function ScoreMode(props) {
    return (
        <div>

        </div>
    )
}

ScoreMode.proptTypes = {
    completed: PropTypes.bool.isRequired,
    roundsCompleted: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired
}

function mapStateToProps({training}) {
    return {
        completed: training.get('completed'),
        roundsCompleted: training.get('roundsCompleted'),
        mode: training.get('mode'),
        score: training.get('score')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(trainingActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreMode)