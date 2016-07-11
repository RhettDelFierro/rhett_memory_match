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
        if (newProps.start && newProps.selectedNoteChosen) {
            //play random note
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