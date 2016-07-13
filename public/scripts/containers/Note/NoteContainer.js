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

    componentWillReceiveProps() {

    }

    render() {
        return (
            <Note {...this.props} />
        )
    }
}

NoteContainer.propTypes = {
    targetNoteChosen: PropTypes.func.isRequired,
    correct: PropTypes.bool
}

function mapStateToProps({training}) {
    return {
        targetNote: training.get('targetNote'),
        correct: training.get('correct')
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(trainingActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer)