import React, { PropTypes, Component } from "react"
import { NoteTraining, Counter } from "scripts/components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { makeNotesObject } from 'scripts/utils/noteTestingFunctions'
import * as trainingActionCreators from 'scrips/redux/modules/training'

class NoteTrainingContainer extends Component {
    constructor() {
        super()
    }

    componentWillReceiveProps(newProps) {
        //remember, we're accessing a store.
        if (newProps.start) {
            //user has guessed:
            if (newProps.selectedNotePlayed && !newProps.targetNotePlayed) {
                //this.props.chooseRandomNote() //problem- we're going to generate a random note every time.
                this.props.checkCorrect(this.props.targetNote, this.props.selectedNote)
            }
            if (!newProps.targetNotePlayed && newProps.correct === false) {
                this.props.noteMissed()
                this.props.playNote(this.props.targetNote, 1, 1)

            }
        }
    }

    render() {
        //<p><span>{!this.props.correct ? this.props.targetNote : ''}</span></p>
        return (
            <div>
                <Counter />
                <NoteTraining />
            </div>
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
    playNote: PropTypes.func.isRequired,
    noteMissed: PropTypes.func, isRequired
}

function mapStateToProps({training}) {
    return {
        targetNote: training.get('targetNote'),
        correct: training.get('correct'),
        attempts: training.get('attempts'),
        start: training.get('start'),
        selectedNote: training.get('selectedNote')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(noteActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTrainingContainer)