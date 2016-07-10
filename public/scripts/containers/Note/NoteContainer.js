import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Note } from 'scripts/components'
import * as actionCreators from 'redux/modules/notes'

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

}

function mapDispatchToProps(dispatch){

}

export default NoteContainer