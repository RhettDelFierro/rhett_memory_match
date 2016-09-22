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

NavPageContainer.propTypes = {
    logout: PropTypes.func.isRequired,
    closeNavModal: PropTypes.func.isRequired,
    isAuthed: PropTypes.bool.isRequired,
    authID: PropTypes.string
}

function mapStateToProps({users, navModal}) {
    return {
        isAuthed: users.get('isAuthed'),
        authID: users.get('authID')
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({...userActionCreators, closeNavModal}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(NavPageContainer)