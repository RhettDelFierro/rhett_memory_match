import React, { PropTypes, Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as songActionCreators from 'redux/modules/songs'
import { Map, OrderedMap, List } from 'immutable'
import { SongList } from 'components'

class SongListContainer extends Component {
    constructor() {
        super()

        this.handlePlayTrack = this.handlePlayTrack.bind(this)
        this.handleSelectTrack = this.handleSelectTrack.bind(this)
    }

    //this component will also handle the play on Spotify.
    handleSelectTrack(trackId) {
        this.props.selectTrack(trackId)
    }

    handlePlayTrack() {
        this.props.playTrack()
    }

    render() {
        return (
            <SongList onSelectTrack={this.handleSelectTrack}
                      onPlayTrack={this.handlePlayTrack}
                      {...this.props} />
        )
    }
}

SongListContainer.propTypes = {
    notesSelected: PropTypes.instanceOf(Map).isRequired,
    playTrack: PropTypes.func.isRequired,
    selectTrack: PropTypes.func.isRequired,
    fetchingSongs: PropTypes.bool.isRequired,
    trackSelected: PropTypes.bool.isRequired,
    selectedTrackId: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired
}

function mapStateToProps({songs}) {
    return {
        notesSelected: songs.get('notesSelected'),
        fetchingSongs: songs.get('fetchingSongs'),
        trackSelected: songs.get('trackSelected'),
        selectedTrackId: songs.get('selectedTrackId'),
        isPlaying: songs.get('isPlaying')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(songActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SongListContainer)