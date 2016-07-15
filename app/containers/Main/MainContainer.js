import React, { Component } from "react"
import { NavigationBarContainer } from "/containers"
import { container } from './styles.css'

class MainContainer extends Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div className={container}>
                {this.props.children}
            </div>
        )
    }
}

export default MainContainer