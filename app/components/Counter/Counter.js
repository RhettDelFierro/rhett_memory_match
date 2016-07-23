import React, {PropTypes} from 'react'
import { container } from './styles.css'

export default function Counter(props) {
    return (
        <div className={container} onClick={props.startGame}>
            {!props.start ? <p>{'Click to begin'}</p>
                : <div>
                <p>Counter: <span>{props.attempts}/60 attempts</span></p>
                <p style={{color: 'springgreen'}}>
                    {!props.correct && props.onCheck && props.mode === 'training'
                        ? `Here is the correct note: ${props.targetNote}`
                        : ''}</p>
            </div>}
        </div>
    )
}

Counter.propTypes = {
    targetNote: PropTypes.string.isRequired,
    targetNotePlayed: PropTypes.bool.isRequired,
    correct: PropTypes.bool.isRequired,
    start: PropTypes.bool.isRequired,
    attempts: PropTypes.number.isRequired,
    onCheck: PropTypes.bool.isRequired,
    mode: PropTypes.string.isRequired
}