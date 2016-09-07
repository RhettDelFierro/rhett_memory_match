import React, { PropTypes, Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as songActionCreators from 'redux/modules/songs'
import { Map, OrderedMap, List } from 'immutable'
import { SongList } from 'components'
import { openSongModal } from 'redux/modules/songModal'

class SongListContainer extends Component {
    constructor() {
        super()

        this.handleSelectTrack = this.handleSelectTrack.bind(this)
    }

    handleSelectTrack(trackId) {
        this.props.selectTrack(trackId)
    }

    render() {
        return (
            <SongList onSelectTrack={this.handleSelectTrack}
                      {...this.props} />
        )
    }
}

SongListContainer.propTypes = {
    notesSelected: PropTypes.instanceOf(Map).isRequired,
    selectTrack: PropTypes.func.isRequired,
    fetchingSongs: PropTypes.bool.isRequired,
    trackSelected: PropTypes.bool.isRequired,
    selectedTrackId: PropTypes.string.isRequired,
    openSongModal: PropTypes.func.isRequired
}

function mapStateToProps({songs}) {
    return {
        notesSelected: songs.get('notesSelected'),
        fetchingSongs: songs.get('fetchingSongs'),
        trackSelected: songs.get('trackSelected'),
        selectedTrackId: songs.get('selectedTrackId')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...songActionCreators, openSongModal}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SongListContainer)