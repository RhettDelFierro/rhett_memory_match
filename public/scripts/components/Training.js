import React from "react"
import NoteTrainingContainer from "../containers/NoteTrainingContainer"

function Training(props){
    return(
        <NoteTrainingContainer playNotes={props.playNotes}/>
    )
}

export default Training