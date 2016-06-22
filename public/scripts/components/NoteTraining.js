var React = require("react");

var Keys = React.createClass({
    playThisNote: function () {
        this.props.onLoadChosenNote(this.props.note);
    },
    render: function () {
        return (
            <button className="btn btn-sm btn-primary" onClick={this.playThisNote}>{this.props.note}</button>
        )
    }
});

function ScoresContainer(props) {
    return (
        props.correct === false
            ? <div onClick={props.onLoadTargetNote}>{props.targetNote}</div>
            : <div onClick={props.onLoadTargetNote}>Next Note</div>
    )
}

function NoteTraining(props) {
    return (
        <div>
            <ScoresContainer correct={props.correct} targetNote={props.targetNote}
                             onLoadTargetNote={props.onLoadTargetNote}/>
            {props.notes.map(function (note) {
                return <Keys note={note.targetNote} key={note.targetNote} onLoadChosenNote={props.onLoadChosenNote}/>
            })}
        </div>
    )
}

module.exports = NoteTraining;