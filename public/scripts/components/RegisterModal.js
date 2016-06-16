var React = require("react");
var Bootstrap = require("react-bootstrap");
var Button = Bootstrap.Button;
var Modal = Bootstrap.Modal;
var Popover = Bootstrap.Popover;
var Tooltip = Bootstrap.Tooltip;
var OverlayTrigger = Bootstrap.OverlayTrigger;
var PropTypes = React.PropTypes;
var RegisterFormContainer = require("../containers/RegisterFormContainer");

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

module.exports = RegisterModal;
