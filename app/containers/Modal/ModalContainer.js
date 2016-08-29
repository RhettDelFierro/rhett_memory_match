import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'components'
import * as modalActionCreators from 'redux/modules/modal'
import * as userActionCreators from 'redux/modules/users'
import { spotifyLogin } from 'redux/modules/songs'

function mapStateToProps ({modal}) {
    return {
        isOpen: modal.get('isOpen')
    }
}
function mapDispatchToProps (dispatch) {
    return bindActionCreators(modalActionCreators, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Modal)