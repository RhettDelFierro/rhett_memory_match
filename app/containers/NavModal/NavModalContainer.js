import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavModal } from 'components'
import * as navModalActionCreators from 'redux/modules/navModal'

function mapStateToProps ({navModal}) {
    return {
        isNavOpen: navModal.get('isNavOpen')
    }
}
function mapDispatchToProps (dispatch) {
    return bindActionCreators(navModalActionCreators, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavModal)