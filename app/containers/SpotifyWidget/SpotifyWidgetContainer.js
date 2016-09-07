import React, { PropTypes,Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SpotifyWidget } from 'components'
import { Map, List, OrderedMap } from 'immutable'
import * as songActionCreators from 'redux/modules/songs'

class SpotifyWidgetContainer extends Component {
    constructor() {
        super()
    }

    componentWillMount() {
        this.props.playTrack()
    }

    render() {
        return (
            <SpotifyWidget {...this.props}/>
        )
    }
}

SpotifyWidgetContainer.propTypes = {
    playTrack: PropTypes.func.isRequired,
    selectedTrackURI: PropTypes.string.isRequired
}

function mapStateToProps({songs}) {
    return {
        selectedTrackURI: songs.get('selectedTrackURI')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(songActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyWidgetContainer)