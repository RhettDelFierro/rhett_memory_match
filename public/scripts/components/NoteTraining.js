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
        this.props.onLoadTargetNote(this.props.targetNote, 1);
    },
    message: function(){
      if (this.props.correct === false){
          return this.props.cacheTargetNote
      } else {
          return "Correct!"
      }
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

var CompleteTesting = React.createClass({
    score: function(){
        return (this.props.keysMissed.length/60)
    },
    keysMainlyMissed: function(){
        var initialValue = {};
        var reducer = function(tally, note){
            if (!tally[note]) {
                tally[note] = 1;
            } else {
                tally[note] = tally[note] +1
            }

            return tally
        };

        var result = this.props.keysMissed.reduce(reducer, initialValue);

        var resultString = "";

        for (var note in result) {
            resultString += note + ": " + result[note] + ", ";
        }

        return resultString
    },
    render: function () {
        return (
            <div>
                <p>Score: {this.score}</p>
                <p>Key most missed: {this.keysMainlyMissed}</p>
            </div>
        )
    }
});

function NoteTraining(props) {
    return props.testingComplete === true
        ? <CompleteTesting keysMissed={props.keysMissed}/>
        : <div>
        <ScoresContainer correct={props.correct}
                         targetNote={props.targetNote}
                         cacheTargetNote={props.cacheTargetNote}
                         onLoadTargetNote={props.onLoadTargetNote}/>

        {props.notes.map(function (note) {
            return <Keys note={note.targetNote} key={note.targetNote} onLoadChosenNote={props.onLoadChosenNote}/>
        })}
    </div>

}

module.exports = NoteTraining;