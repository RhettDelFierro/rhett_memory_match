import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Counter } from 'components'
import * as trainingActionCreators from 'redux/modules/training'

function mapStateToProps({training}) {
    return {
        targetNote: training.get('targetNote'),
        targetNotePlayed: training.get('targetNotePlayed'),
        correct: training.get('correct'),
        start: training.get('start'),
        attempts: training.get('attempts')
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(trainingActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)