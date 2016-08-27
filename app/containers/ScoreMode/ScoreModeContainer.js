import React, { PropTypes, Component } from "react"
import { ScoreMode } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { makeNotesObject } from 'utils/noteTestingFunctions'
import * as scoreActionCreators from 'redux/modules/scores'
import * as trainingActionCreators from 'redux/modules/training'
import { Map } from 'immutable'

class ScoreModeContainer extends Component {
    constructor() {
        super()
    }

    componentWillMount() {
        //call the .reduce here.
        this.props.tally()
    }
    //
    render() {
        return (
            <ScoreMode {...this.props}/>
        )
    }
}

//don't need alot of these:
ScoreModeContainer.propTypes = {
    start: PropTypes.bool.isRequired,
    tally: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    proceed: PropTypes.func.isRequired,
    roundCompleted: PropTypes.bool.isRequired,
    notesMissed: PropTypes.instanceOf(Map).isRequired
}

function mapStateToProps({training, scores}) {
    return {
        roundCompleted: training.get('roundCompleted'),
        mode: training.get('mode'),
        //SHOULD BE THE SCORE FROM SCORES REDUCER?
        score: training.get('score'),
        notesMissed: scores.get('notesMissed')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...scoreActionCreators, ...trainingActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreModeContainer)