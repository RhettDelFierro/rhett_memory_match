import React, { PropTypes,Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Note } from 'scripts/components'
import * as noteActionCreators from 'scripts/redux/modules/notes'
import * as trainingActionCreators from 'scripts/redux/modules/training'

class NoteContainer extends Component {
    constructor() {
        super()
    }

    handleNoteSelected(name){
        this.props.selectedNoteChosen(name)
    }

    render() {

        return (
            <Note onNoteSelected={(name) => this.handleNoteSelected(name)}/>
        )
    }
}

NoteContainer.propTypes = {
    targetNoteChosen: PropTypes.func.isRequired,
    correct: PropTypes.bool
}

function mapStateToProps({training, notes}) {
    return {
        targetNoteChosen: notes.get('targetNoteChosen'),
        correct: training.get('correct')
    }
}

function mapDispatchToProps(dispatch){
    bindActionCreators({noteActionCreators, trainingActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer)