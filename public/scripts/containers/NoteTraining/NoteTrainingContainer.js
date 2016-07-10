import React, { PropTypes, Component } from "react"
import { NoteTraining } from "scripts/components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as noteActionCreators from 'scripts/redux/modules/notes'

class NoteTrainingContainer extends Component {
    constructor() {
        super()
    }

    render() {
        //<Counter attempts={this.props.attempts}/>
        return (
            <div>
                <p><span>{!this.props.correct ? this.props.targetNote : ''}</span></p>
                <NoteTraining />
            </div>
        )
    }
}

function mapStateToProps({notes, training}) {
    return {
        targetNote: notes.targetNote,
        correct: training.correct,
        attempts: training.attempts,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(noteActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTrainingContainer)