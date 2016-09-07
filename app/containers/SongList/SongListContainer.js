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

    render() {
        return (
            <SongList notesSelected={this.props.notesSelected}/>
        )
    }
}

SongListContainer.propTypes = {
    notesSelected: PropTypes.instanceOf(Map).isRequired
}

function mapStateToProps({songs}) {
    return {
        notesSelected: songs.get('notesSelected')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(songActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SongListContainer)