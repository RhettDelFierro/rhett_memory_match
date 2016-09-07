import React, { PropTypes, Component } from "react"
import * as songActionCreators from 'redux/modules/songs'
import { Map, OrderedMap, List } from 'immutable'

export default function SongList (props) {
    return (
        <div>
            {props.notesSelected.map((value,key) => {
                return (
                    <ul>
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
    console.log(trackInfo)
    const name = trackInfo.get('name')
    const artistsArray = trackInfo.get('artists').map((artist) => artist.get('name'))
    const artists = artistsArray.join(', ')
    console.log(name,artists)
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