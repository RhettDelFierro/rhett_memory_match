//will contain <StudentFormContainer> <TableContainer>
import React, { PropTypes, Component } from "react"
import { Home } from "components"
import update from "react-addons-update"

class HomeContainer extends Component {
    constructor() {
        super()
    }

    //handle the scrolling here:


    render() {
        return (
            <Home />
        )
    }
}

export default HomeContainer