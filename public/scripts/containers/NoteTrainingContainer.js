var React = require("react");
var NoteTraining = require("../components/NoteTraining");

var NoteTrainingContainer = React.createClass({
    getInitialState: function() {
        return {
            counter: [],
            guessesArray: [],
            score: 0,
            keyMissed: ""
        }
    },
    handlePlayNote: function(note){
        this.props.playNotes(note);
    },
    render: function(){
        return <NoteTraining onPlayNote={this.handlePlayNote}/>
    }
});

module.exports = NoteTrainingContainer;