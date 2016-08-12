import React, { Component } from "react"
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules'
import { NavigationBarContainer } from 'containers'
import { container } from './styles.css'

class MainContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={container}>
                <NavigationBarContainer isAuthed={this.props.isAuthed} />
                {this.props.children}
            </div>
        )
    }
}

export default connect(({users}) => ({isAuthed: users.get('isAuthed')}))(MainContainer)