import React from "react"
import RegisterModal from "../components/RegisterModal"

const RegisterModalContainer = React.createClass({
    getInitialState () {
        return { showModal: false };
    },
    handleClose () {
        this.setState({ showModal: false });
    },
    handleOpen () {
        this.setState({ showModal: true });
    },
    render () {
        return (
            <RegisterModal onOpen={this.handleOpen}
                           onClose={this.handleClose}
                           modalToggle={this.state.showModal}
                           onUpdateLogin={this.props.onUpdateLogin}/>
        )
    }
});

export default RegisterModalContainer