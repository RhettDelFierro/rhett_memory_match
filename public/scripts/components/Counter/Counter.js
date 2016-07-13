import React, {PropTypes} from 'react'

export default function Counter(props) {
    return (
        <div onClick={this.props.startGame}>
            {!this.props.start ? {'Click to begin'}
                : <div>
                <p>Counter: <span>{this.props.attempts}/60 attempts</span></p>
                <p>{`Select this note: ${this.props.targetNoteChosen}`}</p>
                <p>{!this.props.correct && this.props.targetNotePlayed ? `Here is the correct note: ${this.props.targetNoteChosen}` : ''}</p>
            </div>}
            {this.props.correct ? <p>{''}</p> : <p>Here is the correct note {this.props.targetNoteChosen}</p>}
        </div>
    )
}