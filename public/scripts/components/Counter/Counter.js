import React, {PropTypes} from 'react'

export default function Counter(props) {
    return (
        <div onClick={props.startGame}>
            {!props.start ? <p>{'Click to begin'}</p>
                : <div>
                <p>Counter: <span>{props.attempts}/60 attempts</span></p>
                <p>{`Select this note: ${props.targetNote}`}</p>
                <p>{!props.correct && props.targetNotePlayed
                    ? `Here is the correct note: ${props.targetNote}`
                    : ''}</p>
            </div>}
            {props.correct ? <p>{''}</p> : <p>Here is the correct note {props.targetNote}</p>}
        </div>
    )
}