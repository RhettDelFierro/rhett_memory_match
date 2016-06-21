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
        this.props.playNote(note);
    },
    render: function(){
        return <NoteTraining onPLayNote={this.handlePlayNote}/>
    }
});

module.exports = NoteTrainingContainer;