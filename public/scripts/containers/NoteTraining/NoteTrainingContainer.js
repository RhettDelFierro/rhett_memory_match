import React, { PropTypes, Component } from "react"
import { NoteTraining, Counter } from "scripts/components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { makeNotesObject } from 'scripts/utils/noteTestingFunctions'
import * as noteActionCreators from 'scripts/redux/modules/notes'
import * as trainingActionCreators from 'scrips/redux/modules/training'

class NoteTrainingContainer extends Component {
    constructor() {
        super()
    }

    componentWillMount(){
        //load notes.
        //throw links into redux store?
        this.props.getNotesPath(makeNotesObject)
    }

    componentWillReceiveProps(newProps) {
        //remember, we're accessing a store.
        if (newProps.start) {
            //user has guessed:
            if (newProps.selectedNotePlayed) {
                //this.props.chooseRandomNote() //problem- we're going to generate a random note every time.
                this.props.checkCorect(this.props.targetNote, this.props.selectedNote)
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
    selectedNote: PropTypes.string,
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
        selectedNote: notes.get('selectedNote')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(noteActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteTrainingContainer)