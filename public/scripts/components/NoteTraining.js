import React from "react"

const Keys = React.createClass({
    playThisNote: function () {
        this.props.onLoadChosenNote(this.props.note);
    },
    render: function () {
        return (
            <button className="btn btn-sm btn-primary" onClick={this.playThisNote}>{this.props.note}</button>
        )
    }
});

const ScoresContainer = React.createClass({
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

const CompleteTesting = React.createClass({
    score: function(){
        return (this.props.keysMissed.length/60)
    },
    keysMainlyMissed: function(){
        const initialValue = {};
        let reducer = function(tally, note){
            if (!tally[note]) {
                tally[note] = 1;
            } else {
                tally[note] = tally[note] +1
            }

            return tally
        };

        let result = this.props.keysMissed.reduce(reducer, initialValue);

        let resultString = "";

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

export default NoteTraining