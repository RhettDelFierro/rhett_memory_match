import React from 'react'
import { keyboardContainer, container, keys, majorKey, minorKey } from './styles.css'

function Major({name, key}) {
    //{name === 'Db4' || 'Eb4' || 'Gb4' || 'Ab4' || 'Bb4' ? minorKey : ""}
    return <div className={keys}>{name}</div>
}

function Note(props) {
    const keys = ['C4', 'Db4','D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A', 'Bb4', 'B']

    return (
        <div className={container}>
            {keys.map(key => <Major name={key} id={key} key={key}/>)}
        </div>
    )
}

export default Note