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
                <NavigationBar isAuthed={this.props.isAuthed} logout={this.props.logout}/>
                {this.props.children}
            </div>
        )
    }
}

MainContainer.propTypes = {
    logout: PropTypes.func.isRequired
}

function mapStateToProps({users}) {
    return {
        isAuthed: users.get('isAuthed'),
        authID: users.get('authID')
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(userActionCreators, dispatch)
}


export default connect(({users}) => ({isAuthed: users.get('isAuthed')}), mapDispatchToProps)(MainContainer)