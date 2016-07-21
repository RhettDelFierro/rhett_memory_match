import React, { PropTypes,Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Note } from 'components'
import { Map, List } from 'immutable'
import * as trainingActionCreators from 'redux/modules/training'

class NoteContainer extends Component {
    constructor() {
        super()
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(note) {
        if (this.props.targetNotePlayed) {
            this.props.selectedNoteChosen(note)
        }
    }

    render() {
        return (
            <Note onSelect={this.handleSelect} {...this.props} />
        )
    }
}

NoteContainer.propTypes = {
    targetNoteChosen: PropTypes.func.isRequired,
    correct: PropTypes.bool,
    targetNote: PropTypes.string,
    tracker: PropTypes.instanceOf(List),
    onCheck: PropTypes.bool.isRequired,
    selectedNoteChosen: PropTypes.func.isRequired,
    targetNotePlayed: PropTypes.bool.isRequired
}

function mapStateToProps({training}) {
    return {
        targetNote: training.get('targetNote'),
        correct: training.get('correct'),
        tracker: training.get('tracker'),
        onCheck: training.get('onCheck'),
        targetNotePlayed: training.get('targetNotePlayed')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(trainingActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteContainer)