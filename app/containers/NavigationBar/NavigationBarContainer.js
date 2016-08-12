import React, { PropTypes, Component } from "react"
import { NavigationBar } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { Map, OrderedMap, List } from 'immutable'

class NavigationBarContainer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <NavigationBar isAuthed={this.props.isAuthed}
                           authID={this.props.authID} />
        )
    }
}

NavigationBarContainer.propTypes = {
    authID: PropTypes.string,
    isAuthed: PropTypes.bool.isRequired
};

export default NavigationBarContainer;