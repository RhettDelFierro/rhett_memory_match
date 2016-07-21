import React, {PropTypes} from 'react'

export default function Counter(props) {
    return (
        <div onClick={props.startGame}>
            {!props.start ? <p>{'Click to begin'}</p>
                : <div>
                <p>Counter: <span>{props.attempts}/60 attempts</span></p>
                <p style={{color: 'springgreen'}}>
                    {!props.correct && props.onCheck
                        ? `Here is the correct note: ${props.targetNote}`
                        : ''}</p>
            </div>}
        </div>
    )
}