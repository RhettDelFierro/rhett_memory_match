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
                           return <Songs trackInfo={track}/>
                        })}
                    </ul>
                )
            })}
        </div>
    )
}

function Songs({trackInfo}) {
    const name = trackInfo.get('name')
    const artistsArray = trackInfo.get('artists').map((artist) => artist.get('name'))
    const artists = artistsArray.join(', ')
    return <li>{name} - {artists}</li>

}

SongList.propTypes = {
    notesSelected: PropTypes.instanceOf(Map).isRequired
}


//function mapDispatchToProps(dispatch) {
//    return bindActionCreators(songActionCreators, dispatch)
//}
//
//export default connect(mapStateToProps, mapDispatchToProps)(SongListContainer)