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

    proceed(){
        //method to handle navigation.
        //this.props.navigate() -> is a dispatch to .push()

        //maybe just a dispatch to set completed back to false, that way will load Notetraining container again.
        //do we really need this ScoreMode container?
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

function mapStateToProps({training, scores, volume}) {
    return {
        mode: training.get('mode')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scoreModeActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreModeContainer)