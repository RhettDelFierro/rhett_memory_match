import React, { PropTypes,Component } from 'react'
import { Map, List, OrderedMap } from 'immutable'
import { spotify } from './styles.css'

export default function SpotifyWidget({selectedTrackURI}) {
    const trackURI = selectedTrackURI || 'spotify:track:1kiNatIrwDusOZfR29W0LJ'
    return (
        <iframe className="spotify" src={ `https://embed.spotify.com/?uri=${trackURI}`} width="100%" height="80"
                frameBorder="0" allowTransparency="true"></iframe>
    )
}

SpotifyWidget.propTypes = {
    selectedTrackURI: PropTypes.string.isRequired
}