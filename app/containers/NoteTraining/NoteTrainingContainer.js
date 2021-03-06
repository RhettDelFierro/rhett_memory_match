import React, { PropTypes, Component } from "react"
import { NoteTraining } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { makeNotesObject } from 'utils/noteTestingFunctions'
import * as trainingActionCreators from 'redux/modules/training'
import { Map, OrderedMap, List } from 'immutable'

class NoteTrainingContainer extends Component {
    constructor() {
        super()
    }

    //componentWillMount() {
    //    //instead of set-mode, check the scoring reducer/store to see where we're at.
    //    this.props.setMode()
    //}

    componentWillReceiveProps(newProps) {
        //remember, we're accessing a store.
        if (newProps.sessionCompleted) {
            //dispatch modal.
        }
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
                if(this.props.mode === 'training'){
                    this.props.playIncorrect()
                } else {
                    this.props.guessed()
                }
            }

            if (newProps.correct && newProps.onCheck) {
                this.props.guessed()
            }

            //right when game starts(clicked on counter) will play starting target note.
            if (this.props.attempts === 0 && !newProps.targetNotePlayed && newProps.targetNote === '') {
                this.props.chooseRandomNote()
            }
        }
    }

    render() {
        //<p><span>{!this.props.correct ? this.props.targetNote : ''}</span></p>

        //if this.props.roundCompleted = false, render the scoreMode.
        return (
            <NoteTraining start={this.props.start}
                          mode={this.props.mode}
                          roundCompleted={this.props.roundCompleted}/>
        )
    }
}

NoteTrainingContainer.propTypes = {
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
    noteBuffer: PropTypes.instanceOf(Map),
    completeGuess: PropTypes.func.isRequired,
    playIncorrect: PropTypes.func.isRequired,
    guessed: PropTypes.func.isRequired,
    setMode: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    tracker: PropTypes.instanceOf(List),
    roundCompleted: PropTypes.bool.isRequired
}

function mapStateToProps({ training, volume }) {
    return {
        targetNote: training.get('targetNote'),
        correct: training.get('correct'),
        attempts: training.get('attempts'),
        start: training.get('start'),
        selectedNote: training.get('selectedNote'),
        tracker: training.get('tracker'),
        selectedNotePlayed: training.get('selectedNotePlayed'),
        onCheck: training.get('onCheck'),
        mode: training.get('mode'),
        roundCompleted: training.get('roundCompleted'),
        sessionCompleted: training.get('sessionComplete')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(trainingActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTrainingContainer)