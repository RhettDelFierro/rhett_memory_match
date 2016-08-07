import React, { PropTypes, Component } from "react"
import { ScoreMode } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { makeNotesObject } from 'utils/noteTestingFunctions'
import * as scoreModeActionCreators from 'redux/modules'
import { Map } from 'immutable'

class ScoreModeContainer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <ScoreMode />
        )
    }
}

ScoreModeContainer.propTypes = {
    chooseRandomNote: PropTypes.func.isRequired,
    start: PropTypes.bool.isRequired,
    selectedNote: PropTypes.string,
    correct: PropTypes.bool.isRequired,
    targetNote: PropTypes.string,
    attempts: PropTypes.number.isRequired,
    checkCorrect: PropTypes.func.isRequired,
    noteMissed: PropTypes.func.isRequired,
    selectedNotePlayed: PropTypes.bool.isRequired,
    onCheck: PropTypes.bool.isRequired,
    completeGuess: PropTypes.func.isRequired,
    playIncorrect: PropTypes.func.isRequired,
    guessed: PropTypes.func.isRequired,
    setMode: PropTypes.func.isRequired,
    resetTraining: PropTypes.func.isRequired
}

function mapStateToProps({training, volume}) {
    return {
        targetNote: training.get('targetNote'),
        correct: training.get('correct'),
        attempts: training.get('attempts'),
        start: training.get('start'),
        selectedNote: training.get('selectedNote'),
        tracker: training.get('tracker'),
        selectedNotePlayed: training.get('selectedNotePlayed'),
        onCheck: training.get('onCheck'),
        mode: training.get('mode')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scoreModeActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreModeContainer)