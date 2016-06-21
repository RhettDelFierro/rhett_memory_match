var React = require("react");
//var PreTestContainer = require("../containers/PreTestContainer");
var NoteTrainingContainer = require("../containers/NoteTrainingContainer");
//var PostTrainingContainer = require("../containers/PostTrainingContainer");

function Training(props){
    return(
        <NoteTrainingContainer counter={props.counter} playNotes={props.playNotes}/>
    )
}

module.exports = Training;