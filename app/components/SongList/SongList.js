import React, { PropTypes, Component } from "react"
import * as songActionCreators from 'redux/modules/songs'
import { Map, OrderedMap, List } from 'immutable'
import { songContainer, noteGroup, selected, playBtn } from './styles.css'
import { SongModalContainer, SpotifyWidgetContainer } from 'containers'

export default function SongList(props) {

    return (
        <div>
            <div className={songContainer}>
                {props.notesSelected.map((value, key) => {
                    return (
                        <ul key={key} className={noteGroup}>{key}
                            {value.map((track) => {
                                return <Songs trackInfo={track} {...props}/>
                            })}
                        </ul>
                    )
                })}
            </div>
            <SpotifyWidgetContainer />
        </div>
    )
}

function Songs(props) {
    const { trackInfo,onSelectTrack,selectedTrackId,onPlayTrack } = props

    const name = trackInfo.get('name')
    const artistsArray = trackInfo.get('artists').map((artist) => artist.get('name'))
    const artists = artistsArray.join(', ')
    const id = trackInfo.get('id')

    const liStyle = selectedTrackId === id ? selected : ''
    //<span className={playBtn} onClick={() => props.onPlayTrack()}>Play</span>
    return (
        <li className={liStyle} key={id} onClick={() => onSelectTrack(id)}>{name} - {artists}
            <span className={playBtn} onClick={() => onPlayTrack()}>{'Play Song!'}</span>
        </li>
    )
}

SongList.propTypes = {
    onSelectTrack: PropTypes.func.isRequired,
    notesSelected: PropTypes.instanceOf(Map).isRequired,
    fetchingSongs: PropTypes.bool.isRequired,
    trackSelected: PropTypes.bool.isRequired,
    selectedTrackId: PropTypes.string.isRequired,
    playTrack: PropTypes.func.isRequired,
    openSongModal: PropTypes.func.isRequired
}