import React from "react"

const Keys = React.createClass({
    playThisNote () {
        this.props.onLoadChosenNote(this.props.note);
    },
    render () {
        return (
            <button className="btn btn-sm btn-primary" onClick={this.playThisNote}>{this.props.note}</button>
        )
    }
});

const ScoresContainer = React.createClass({
    loadTargetNote () {
        this.props.onLoadTargetNote(this.props.targetNote, 1);
    },
    message (){
      if (this.props.correct === false){
          return this.props.cacheTargetNote
      } else {
          return "Correct!"
      }
    },
    render () {
        return (
            <div onClick={this.loadTargetNote}>
                <p>Next Note</p>
                <p><span>{!this.props.correct ? this.props.cacheTargetNote : "Correct!"}</span></p>
            </div>
        )
    }
});

const CompleteTesting = React.createClass({
    score (){
        return (this.props.keysMissed.length/60)
    },
    keysMainlyMissed (){
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
    render () {
        return (
            <div>
                <p>Score: {this.score}</p>
                <p>Key most missed: {this.keysMainlyMissed}</p>
            </div>
        )
    }
});

function NoteTraining(props) {

    const { testingComplete, keysMissed, correct,
        targetNote, cacheTargetNote, onLoadTargetNote,
        notes, onLoadChosenNote } = props;

    return testingComplete === true
        ? <CompleteTesting keysMissed={keysMissed}/>
        : <div>
        <ScoresContainer correct={correct}
                         targetNote={targetNote}
                         cacheTargetNote={cacheTargetNote}
                         onLoadTargetNote={onLoadTargetNote}/>

        {notes.map((note) => <Keys note={note.targetNote} key={note.targetNote} onLoadChosenNote={onLoadChosenNote}/>)}

    </div>

}

export default NoteTraining