import React, { PropTypes, Component } from "react"
import * as songActionCreators from 'redux/modules/songs'
import { Map, OrderedMap, List } from 'immutable'
import { songContainer, noteGroup } from './styles.css'

export default function SongList (props) {
    return (
        <div className={songContainer}>
            {props.notesSelected.map((value,key) => {
                return (
                    <ul className={noteGroup}>{key}
                        {value.map((track) => {
                           return <Songs trackInfo={track} onSelectTrack={props.onSelectTrack}/>
                        })}
                    </ul>
                )
            })}
        </div>
    )
}

function Songs({trackInfo,onSelectTrack}) {
    const name = trackInfo.get('name')
    const artistsArray = trackInfo.get('artists').map((artist) => artist.get('name'))
    const artists = artistsArray.join(', ')
    const id = trackInfo.get('id')

    return <li key={id} onClick={() => onSelectTrack(id)}>{name} - {artists}</li>
}

SongList.propTypes = {
    notesSelected: PropTypes.instanceOf(Map).isRequired,
    onSelectTrack: PropTypes.func.isRequired
}