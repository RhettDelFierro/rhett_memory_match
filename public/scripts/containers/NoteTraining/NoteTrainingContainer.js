import React, { Component } from "react"
import { NoteTraining } from "scripts/components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as noteActionCreators from '/redux/modules/notes'

class NoteTrainingContainer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <NoteTraining />
        )
    }
}

function mapStateToProps({notes, training}) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(noteActionCreators, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(NoteTrainingContainer)