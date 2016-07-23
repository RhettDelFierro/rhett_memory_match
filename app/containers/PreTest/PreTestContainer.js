import React, { PropTypes, Component } from "react"
import { NoteTraining } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { makeNotesObject } from 'utils/noteTestingFunctions'
import * as trainingActionCreators from 'redux/modules/training'
import { Map } from 'immutable'

class PreTestContainer extends Component {
    constructor() {
        super()
        this.state = {
            mode: 'pretest'
        }
    }

    componentWillUnmount() {
        this.props.resetTraining()
    }

    componentWillMount() {
        this.props.setMode(this.state.mode)
    }

    componentWillReceiveProps(newProps) {
        //remember, we're accessing a store.
        if (newProps.start) {
            //user has guessed:
            if (newProps.selectedNotePlayed && !newProps.onCheck) {
                //console.log('componentwillreceiveprops 1')
                this.props.checkCorrect()
            }
            //handles incorrect.:
            if (!newProps.correct && newProps.onCheck) {
                //console.log('componentwillreceiveprops 2')
                this.props.noteMissed()
                this.props.guessed()

            }

            if (newProps.correct && newProps.onCheck) {
                this.props.guessed()
            }

            if (this.props.attempts === 0 && !newProps.targetNotePlayed && newProps.targetNote === '') {
                this.props.chooseRandomNote()
            }
        }
    }

    render() {
        //<p><span>{!this.props.correct ? this.props.targetNote : ''}</span></p>
        return (
            <NoteTraining start={this.props.start} />
        )
    }
}

PreTestContainer.propTypes = {
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
    return bindActionCreators(trainingActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PreTestContainer)