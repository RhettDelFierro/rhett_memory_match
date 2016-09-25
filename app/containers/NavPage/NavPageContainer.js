import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { closeNavModal } from 'redux/modules/navModal'
import { NavPage } from 'components'

class NavPageContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <NavPage {...this.props} />
        )
    }
}

const { func, bool, string } = PropTypes
NavPageContainer.propTypes = {
    logout: func.isRequired,
    closeNavModal: func.isRequired,
    isAuthed: bool.isRequired,
    username: string
}

function mapStateToProps({users, navModal}) {
    return {
        isAuthed: users.get('isAuthed'),
        appLogin: users.get('appLogin'),
        username: users.get('appLogin') ? users.getIn([users.get('authId'),'info','username']) : users.get('authId')
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...userActionCreators, closeNavModal}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(NavPageContainer)