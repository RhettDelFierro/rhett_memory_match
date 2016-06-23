import React, { PropTypes } from "react"
import { Button, Modal } from "react-bootstrap"
import RegisterFormContainer from "../containers/RegisterFormContainer"

function RegisterModal(props) {
    return (
        <div>
            <Button
                bsClass="btn btn-primary navbar-btn"
                onClick={props.onOpen}
            >
                Register
            </Button>

            <Modal show={props.modalToggle} onHide={props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterFormContainer onUpdateLogin={props.onUpdateLogin}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

RegisterModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

export default RegisterModal
