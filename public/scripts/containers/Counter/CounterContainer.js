import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Counter } from 'scripts/components'
import * as trainingActionCreators from 'scripts/redux/modules/notes'

function mapStateToProps({training, notes}) {
    return {
        targetNoteChosen: notes.targetNoteChosen,
        targetNotePlayed: notes.targetNotePlayed,
        correct: training.get('correct'),
        start: training.get('start'),
        attempts: training.get('attempts')
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(trainingActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)