import React, {PropTypes} from 'react'

export default function Counter(props) {
    return (
        <div onClick={this.props.startGame}>
            {!this.props.start ? {'Click to begin'} : <p>Counter: <span>{this.props.attempts}/60 attempts</span></p>}
            {this.props.correct ? <p>{''}</p> : <p>Here is the correct note {this.props.targetNoteChosen}</p>}
        </div>
    )
}