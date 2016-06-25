import React, { Component } from "react"
import Info from "../components/Info"

class InfoContainer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Info onPlayTarget={this.props.onPlayTarget}/>
        )
    }
}

export default InfoContainer