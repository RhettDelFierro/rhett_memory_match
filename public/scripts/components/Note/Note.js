import React, { PropTypes } from 'react'
import { keyboardContainer, container, keys, minorKeys } from './styles.css'

//function Keys({name, key, onNoteSelected}) {
//    let keyClass = keys
//    if (name[1] === 'b') {
//        keyClass = minorKeys;
//    }
//
//    return <div className={keyClass} onClick={onNoteSelected}><p>{name}</p></div>
//}

function Note(props) {

    let incorrect = {backgroundColor: 'green'}

    const notes = ['C4', 'Db', 'D4', 'Eb4', 'E4', 'F', 'Gb4', 'G4', 'Ab4', 'A', 'Bb4', 'B']

    return (
        <div className={container}>
            {notes.map(note => {
                let keyClass = keys
                if (note[1] === 'b') {
                    keyClass = minorKeys;
                }
                return (
                    <div
                        className={keyClass} id={note} key={note}
                        onClick={(note) => props.selectedNoteChosen(note)}>
                        {note}
                    </div>
                )
            })
            }
        </div>
    )
}

Note.propTypes = {
    selectedNoteChosen: PropTypes.func.isRequired,
    correct: PropTypes.bool,
    targetNote: PropTypes.string
}

export default Note