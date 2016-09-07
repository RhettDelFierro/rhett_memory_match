import React, { PropTypes, Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as songActionCreators from 'redux/modules/songs'
import { Map, OrderedMap, List } from 'immutable'
import { SongList } from 'components'

class SongListContainer extends Component {
    constructor() {
        super()
    }

    //this component will also handle the play on Spotify.
    handleSelectSong(id) {
        this.props.selectTrack(id)
    }

    handlePlayTrack(id) {
        this.props.playTrack(id)
    }

    render() {
        return (
            <SongList notesSelected={this.props.notesSelected} onSelectTrack={this.handleSelectTrack}/>
        )
    }
}

SongListContainer.propTypes = {
    notesSelected: PropTypes.instanceOf(Map).isRequired,
    playTrack: PropTypes.func.isRequired,
    selectTrack: PropTypes.func.isRequired,
    fetchingSongs: PropTypes.bool.isRequired,
    selectedTrackId: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired
}

function mapStateToProps({songs}) {
    return {
        notesSelected: songs.get('notesSelected'),
        fetchingSongs: songs.get('fetchingSongs'),
        selectedTrackId: songs.get('selectredTrackId'),
        isPlaying: songs.get('isPlaying')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(songActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SongListContainer)