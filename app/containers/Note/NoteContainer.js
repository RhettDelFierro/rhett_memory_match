import React, { PropTypes,Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Note } from 'components'
import { Map, List } from 'immutable'
import * as noteActionCreators from 'redux/modules/notes'
import * as trainingActionCreators from 'redux/modules/training'

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
    correct: PropTypes.bool,
    targetNote: PropTypes.string,
    tracker: PropTypes.instanceOf(List)
}

function mapStateToProps({training}) {
    return {
        targetNote: training.get('targetNote'),
        correct: training.get('correct'),
        tracker: training.get('tracker')
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(trainingActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer)