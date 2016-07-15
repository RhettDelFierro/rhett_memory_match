import React, { PropTypes } from "react"
import { Button, Modal } from "react-bootstrap"
import { RegisterFormContainer } from "containers"

function RegisterModal({onOpen, modalToggle, onClose, onUpdateLogin}) {
    return (
        <div>
            <Button
                bsClass="btn btn-primary navbar-btn"
                onClick={onOpen}
            >
                Register
            </Button>

            <Modal show={modalToggle} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RegisterFormContainer onUpdateLogin={onUpdateLogin}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose}>Close</Button>
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
