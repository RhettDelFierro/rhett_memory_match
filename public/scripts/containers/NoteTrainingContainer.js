var React = require("react");
var NoteTraining = require("../components/NoteTraining");
var noteTestingFunctions = require("../utils/noteTestingFunctions");

var NoteTrainingContainer = React.createClass({
    getInitialState: function() {
        return {
            counter: [],
            guessesArray: [],
            score: 0,
            keyMissed: "",
            targetNote: "",
            chosenNote: "",
            targetNotePlayed: false,
            chosenNotePlayed: false
        }
    },
    handlePlayNote: function(note){
        this.props.playNotes(note);
    },
    handleTargetNote: function(note){
        this.handlePlayNote(note);
        this.setState({
            targetNote: note
        })
    },
    handleChosenNote: function(note){
        this.handlePlayNote(note);
        this.setState({
            chosenNote: note
        })
    },
    componentDidMount: function(){
      var targetNote = noteTestingFunctions.initializeNote();
      this.setState({
          counter: this.props.counter,
          targetNote: targetNote
      })
    },
    render: function(){
        return <NoteTraining onPlayNote={this.handlePlayNote}/>
    }
});

module.exports = NoteTrainingContainer;