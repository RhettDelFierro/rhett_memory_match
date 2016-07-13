import React, { PropTypes, Component } from "react"
import { NoteTraining, Counter } from "scripts/components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as noteActionCreators from 'scripts/redux/modules/notes'

class NoteTrainingContainer extends Component {
    constructor() {
        super()
    }

    componentWillReceiveProps(newProps) {
        //remember, we're accessing a store.
        if (newProps.start) {
            //user has guessed:
            if (newProps.selectedNotePlayed) {
                //this.props.chooseRandomNote() //problem- we're going to generate a random note every time.
                this.props.checkCorect(this.props.targetNote, this.props.selectedNoteChosen)
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
    selectedNoteChosen: PropTypes.string,
    correct: PropTypes.bool.isRequired,
    targetNote: PropTypes.string,
    attempts: PropTypes.number.isRequired,
    checkCorrect: PropTypes.func.isRequired
}

function mapStateToProps({notes, training}) {
    return {
        targetNote: notes.get('targetNote'),
        correct: training.get('correct'),
        attempts: training.get('attempts'),
        start: training.get('start'),
        selectedNoteChosen: notes.get('selectedNoteChosen')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(noteActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTrainingContainer)