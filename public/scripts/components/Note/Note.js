import React from 'react'
import { keyboardContainer, container, keys, minorKeys } from './styles.css'

function Major({name, key}) {
    let keyClass = keys
    if (name[1] === 'b') {
        keyClass = minorKeys;
    }

    return <div className={keyClass}>{name}</div>
}

function Note(props) {
    const notes = ['C4', 'Db', 'D4', 'Eb4', 'E4', 'F', 'Gb4', 'G4', 'Ab4', 'A', 'Bb4', 'B']


    return (
        <div className={container}>
            {notes.map(note => <Major name={note} id={note} key={note}/>)}
        </div>
    )
}

export default Note