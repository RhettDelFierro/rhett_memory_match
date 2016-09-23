import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
                <NavigationBar isAuthed={this.props.isAuthed} logout={this.props.logout} isNavOpen={this.props.isNavOpen}/>
                {this.props.children}
            </div>
        )
    }
}

const { func, bool } = PropTypes
MainContainer.propTypes = {
    logout: func.isRequired,
    isNavOpen: bool.isRequired
}

function mapStateToProps({users, navModal}) {
    return {
        isAuthed: users.get('isAuthed'),
        authID: users.get('authID'),
        isNavOpen: navModal.get('isNavOpen')
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(userActionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)