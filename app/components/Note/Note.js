import React, { PropTypes } from 'react'
import { keyboardContainer, container, keys, minorKeys } from './styles.css'
import { Map, List } from 'immutable'

//function Keys({name, key, onnote}) {
//    let keyClass = keys
//    if (name[1] === 'b') {
//        keyClass = minorKeys;
//    }
//
//    return <div className={keyClass} onClick={onnote}><p>{name}</p></div>
//}

function Note(props) {
    let background = {backgroundColor: 'springgreen'}
    let incorrect = props.correct ? '' : background

    //can also just use tracker.get('name')
    const notes = ['C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4', 'Ab4', 'A4', 'Bb4', 'B4']

    //{notes.map(note => {
    //    let keyClass = keys
    //    if (note[1] === 'b') {
    //        keyClass = minorKeys
    //    }
    //
    //    return (
    //        <div
    //            className={keyClass} id={note} key={note}
    //            onClick={() => props.selectedNoteChosen(note)}>
    //            {note}
    //        </div>
    //    )
    //})
    //}

    return (
        <div className={container}>
            {props.tracker.map((note) => {
                let keyClass = keys
                if (note.get('name')[1] === 'b') {
                    keyClass = minorKeys
                }

                return (
                    <div
                        className={keyClass} id={note.get('name')} key={note.get('name')}
                        onClick={() => props.selectedNoteChosen(note.get('name'))}>
                        {note.get('name')}
                    </div>
                )
            })}
        </div>
    )
}

Note.propTypes = {
    selectedNoteChosen: PropTypes.func.isRequired,
    correct: PropTypes.bool,
    targetNote: PropTypes.string
}

export default Note