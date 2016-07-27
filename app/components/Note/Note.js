import React, { PropTypes } from 'react'
import { keyboardContainer, container, keys, minorKeys, incorrect } from './styles.css'
import { Map, List, OrderedMap } from 'immutable'

//function Keys({name, key, onnote}) {
//    let keyClass = keys
//    if (name[1] === 'b') {
//        keyClass = minorKeys;
//    }
//
//    return <div className={keyClass} onClick={onnote}><p>{name}</p></div>
//}

export default function Note(props) {

    return (
        <div className={container}>
            {props.tracker.map((note) => {
                let keyClass = keys
                if (note.get('name')[1] === 'b') {
                    keyClass = minorKeys
                }

                if (!props.correct && props.targetNote === note.get('name') && props.onCheck && props.mode === 'training') {
                    keyClass = `${keyClass} ${incorrect}`
                }


                return (
                    <div
                        className={keyClass} id={note.get('name')} key={note.get('name')}
                        onClick={() => props.onSelect(note.get('name'))}>
                        <p>{note.get('name')}</p>
                    </div>
                )
            })}
        </div>
    )
}

Note.propTypes = {
    selectedNoteChosen: PropTypes.func.isRequired,
    correct: PropTypes.bool,
    targetNote: PropTypes.string,
    tracker: PropTypes.instanceOf(OrderedMap).isRequired,
    onSelect: PropTypes.func.isRequired,
    onCheck: PropTypes.bool.isRequired,
    mode: PropTypes.string
}
