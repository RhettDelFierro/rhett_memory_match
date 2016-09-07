import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SongModal } from 'components'
import * as songActionCreators from 'redux/modules/songs'
import * as songModalActionCreators from 'redux/modules/songModal'

function mapStateToProps ({songModal}) {
    return {
        isOpen: songModal.get('isOpen')
    }
}
function mapDispatchToProps (dispatch) {
    return bindActionCreators(songModalActionCreators, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongModal)