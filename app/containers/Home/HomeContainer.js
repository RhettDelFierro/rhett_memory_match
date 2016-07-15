//will contain <StudentFormContainer> <TableContainer>
import React, { PropTypes, Component } from "react"
import { Home } from "components"
import update from "react-addons-update"

class HomeContainer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <Home />
        )
    }
}

export default HomeContainer