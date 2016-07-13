import React, { PropTypes } from 'react'
import { keyboardContainer, container, keys, minorKeys } from './styles.css'

function Keys({name, key, onNoteSelected}) {
    let keyClass = keys
    if (name[1] === 'b') {
        keyClass = minorKeys;
    }

    return <div className={keyClass} onClick={onNoteSelected}><p>{name}</p></div>
}

function Note(props) {

    const notes = ['C4', 'Db', 'D4', 'Eb4', 'E4', 'F', 'Gb4', 'G4', 'Ab4', 'A', 'Bb4', 'B']

    return (
        <div className={container}>
            {notes.map(note => <Keys name={note} id={note} key={note} onNoteSelected={(note) => props.onNoteSelected(note)}/>)}
        </div>
    )
}

Note.propTypes = {
    onNoteSelected: PropTypes.func.isRequired
}

export default Note