import React, { Component } from "react"
import { RegisterModal } from "scripts/components"

class RegisterModalContainer extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    handleClose() {
        this.setState({showModal: false});
    }

    handleOpen() {
        this.setState({showModal: true});
    }

    render() {
        return (
            <RegisterModal onOpen={() => this.handleOpen}
                           onClose={() => this.handleClose}
                           modalToggle={this.state.showModal}
                           onUpdateLogin={() => this.props.onUpdateLogin}/>
        )
    }
}

export default RegisterModalContainer