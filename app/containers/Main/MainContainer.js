import React, { Component } from "react"
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import { NavigationBar } from 'components'
import { container } from './styles.css'

class MainContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className={container}>
                <NavigationBar isAuthed={this.props.isAuthed} />
                {this.props.children}
            </div>
        )
    }
}

function mapStateToProps({users}) {
    return {
        isAuthed: users.get('isAuthed'),
        authID: users.get('authID')
    }
}

function MapDispatchToProps(dispatch){
    return bindActionCreators(userActionCreators, dispatch)
}


export default connect(({users}) => ({isAuthed: users.get('isAuthed')}))(MainContainer)