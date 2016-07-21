import React, {PropTypes} from 'react'
import { container } from './styles.css'

export default function Counter(props) {
    return (
        <div className={container} onClick={props.startGame}>
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