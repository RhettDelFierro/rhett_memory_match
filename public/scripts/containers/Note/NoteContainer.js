import React, { PropTypes,Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Note } from 'scripts/components'
import * as actionCreators from 'scripts/redux/modules/notes'

class NoteContainer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Note />
        )
    }
}

NoteContainer.propTypes = {
    targetNoteChosen: PropTypes.func.isRequired
}

function mapStateToProps({training, notes}) {
    return {
        targetNoteChosen: PropTypes.func.isRequired
    }
}

function mapDispatchToProps(dispatch){

}

export default NoteContainer