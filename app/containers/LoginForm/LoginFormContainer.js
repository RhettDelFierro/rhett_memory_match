import React, { PropTypes, Component } from "react"
import { NoteTraining } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { makeNotesObject } from 'utils/noteTestingFunctions'
import * as trainingActionCreators from 'redux/modules/training'
import { Map, OrderedMap, List } from 'immutable'

class LoginFormContainer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <LoginForm />
        )
    }
}

LoginFormContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps({users}) {

}

function mapDispatchToProps(dispatch) {

}

export default connect()(LoginFormContainer)