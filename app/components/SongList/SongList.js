import React, { PropTypes, Component } from "react"
import * as songActionCreators from 'redux/modules/songs'
import { Map, OrderedMap, List } from 'immutable'
import { songContainer, noteGroup, selected, playBtn } from './styles.css'

export default function SongList(props) {
    return (
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
            <button className={playBtn} onClick={() => props.onPlayTrack()}>Play</button>
        </div>
    )
}

function Songs(props) {
    const { trackInfo,onSelectTrack,selectedTrackId,trackSelected,onPlayTrack } = props

    const name = trackInfo.get('name')
    const artistsArray = trackInfo.get('artists').map((artist) => artist.get('name'))
    const artists = artistsArray.join(', ')
    const id = trackInfo.get('id')

    const liStyle = selectedTrackId === id ? selected : ''

    return <li className={liStyle} key={id} onClick={() => onSelectTrack(id)}>{name} - {artists}
        <span className={playBtn} onClick={() => props.onPlayTrack()}>Play</span>
    </li>
}

SongList.propTypes = {
    onSelectTrack: PropTypes.func.isRequired,
    onPlayTrack: PropTypes.func.isRequired,
    notesSelected: PropTypes.instanceOf(Map).isRequired,
    playTrack: PropTypes.func.isRequired,
    fetchingSongs: PropTypes.bool.isRequired,
    trackSelected: PropTypes.bool.isRequired,
    selectedTrackId: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired
}