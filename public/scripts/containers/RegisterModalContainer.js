import React from "react"
import RegisterModal from "../components/RegisterModal"

const RegisterModalContainer = React.createClass({
    getInitialState: function () {
        return { showModal: false };
    },
    handleClose: function () {
        this.setState({ showModal: false });
    },
    handleOpen() {
        this.setState({ showModal: true });
    },
    render: function () {
        return (
            <RegisterModal onOpen={this.handleOpen}
                           onClose={this.handleClose}
                           modalToggle={this.state.showModal}
                           onUpdateLogin={this.props.onUpdateLogin}/>
        )
    }
});

export default RegisterModalContainer