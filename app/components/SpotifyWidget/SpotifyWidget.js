import React, { PropTypes,Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map, List, OrderedMap } from 'immutable'
import * as songActionCreators from 'redux/modules/songs'

export default function SpotifyWidget(props) {
    return (
        <iframe src={`https://embed.spotify.com/?uri=${props.selectedTrackURI}`} width="300" height="80"
                frameBorder="0" allowTransparency="true"></iframe>
    )
}

SpotifyWidget.propTypes = {
    playTrack: PropTypes.func.isRequired,
    selectedTrackURI: PropTypes.string.isRequired
}
