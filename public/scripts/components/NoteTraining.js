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
    loadTargetNote: function(){
        this.props.onLoadTargetNote(this.props.targetNote);
    },
    componentWillReceiveProps: function(){
      if (this.props.correct === false && this.props.targetNotePlayed && this.props.chosenNotePlayed){
          this.props.onLoadTargetNote(this.props.targetNote)
      }
    },
    render: function() {
        return (
            this.props.correct === false
                ? <div onClick={this.loadTargetNote}>{this.props.targetNote}</div>
                : <div onClick={this.loadTargetNote}>Next Note</div>
        )
    }
});

function NoteTraining(props) {
    return (
        <div>
            <ScoresContainer correct={props.correct}
                             targetNote={props.targetNote}
                             onLoadTargetNote={props.onLoadTargetNote}
            targetNotePlayed={props.targetNotePlayed}
            chosenNotePlayed={props.chosenNotePlayed}/>
            {props.notes.map(function (note) {
                return <Keys note={note.targetNote} key={note.targetNote} onLoadChosenNote={props.onLoadChosenNote} />
            })}
        </div>
    )
}

module.exports = NoteTraining;