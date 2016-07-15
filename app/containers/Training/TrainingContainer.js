import React, { Component } from "react"
import { Training } from "components"
import { loadNotes } from "../../utils/noteTestingFunctions"

class TrainingContainer extends Component {
    constructor() {
        super();
        this.state = {
            inm: 0,
            scoresTest: {},
            chosen: "",
            counter: []
        }
    }

    componentDidMount() {
        this.setState({
            inm: this.props.location.query.score
        })
    }

    render() {
        //maybe depending which one they go to, render that.
        const playNotes = loadNotes();
        return (
            <Training playNotes={playNotes} scores={this.state.scoresTest}/>
        )
    }
}

export default TrainingContainer