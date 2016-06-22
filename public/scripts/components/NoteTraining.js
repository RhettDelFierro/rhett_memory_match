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

var ScoresContainer = React.createClass({
    loadTargetNote: function () {
        this.props.onLoadTargetNote(this.props.targetNote);
    },
    render: function () {
        return (
            <div onClick={this.loadTargetNote}>
                <p>Next Note</p>
                <p><span>{!this.props.correct ? this.props.cacheTargetNote : "Correct!"}</span></p>
            </div>
        )
    }
});

function NoteTraining(props) {
    return (
        <div>
            <ScoresContainer correct={props.correct}
                             targetNote={props.targetNote}
                             cacheTargetNote={props.cacheTargetNote}
                             onLoadTargetNote={props.onLoadTargetNote} />


            {props.notes.map(function (note) {
                return <Keys note={note.targetNote} key={note.targetNote} onLoadChosenNote={props.onLoadChosenNote}/>
            })}
        </div>
    )
}

module.exports = NoteTraining;