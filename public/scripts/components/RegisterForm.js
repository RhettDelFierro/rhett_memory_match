var React = require("react");
var Bootstrap = require("react-bootstrap");
var FormGroup = Bootstrap.FormGroup;
var FormControl = Bootstrap.FormControl;
var Button = Bootstrap.Button;
var form = Bootstrap.Form;
var ControlLabel = Bootstrap.ControlLabel;
var PropTypes = React.PropTypes;
var HelpBlock = Bootstrap.HelpBlock;


function RegisterForm(props) {
    var helpBlock;
    if (props.duplicate) {
        helpBlock = <HelpBlock bsClass={props.helpBlock}
                               style={{color: "red"}}>
            {props.user} is already taken.
        </HelpBlock>;
    } else {
        helpBlock = <HelpBlock bsClass={props.helpBlock}
                               style={{color: "green"}}>
            {props.user} is valid.
        </HelpBlock>;
    }
    return (
        <form onSubmit={props.onSubmitUser}>
            <FormGroup controlId="formControlsText">
                <ControlLabel>Username</ControlLabel>
                <FormControl type="text" placeholder="Enter username" onChange={props.onUpdateUser} value={props.user}/>
                {helpBlock}
            </FormGroup>
            <FormGroup controlId="formControlsEmail">
                <ControlLabel>Email</ControlLabel>
                <FormControl type="email" placeholder="Enter email" onChange={props.onUpdateEmail} value={props.email}/>
            </FormGroup>
            <FormGroup controlId="formControlsPassword">
                <ControlLabel>Password</ControlLabel>
                <FormControl type="password" onChange={props.onUpdatePassword}/>
            </FormGroup>
            <Button className={props.duplicate === true ? "disabled" : "active"} type="submit">
                Submit
            </Button>
        </form>
    )
}

RegisterForm.propTypes = {
    onUpdateUser: PropTypes.func,
    onSubmitUser: PropTypes.func,
    user: PropTypes.string,
    onUpdateEmail: PropTypes.func,
    onUpdatePassword: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
    duplicate: PropTypes.bool.isRequired,
    helpBlock: PropTypes.string.isRequired
};

module.exports = RegisterForm;
