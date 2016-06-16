var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
var PropTypes = React.PropTypes;
var Bootstrap = require("react-bootstrap");
var LoginFormContainer = require("../containers/LoginFormContainer");
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var NavItem = Bootstrap.NavItem;
var RegisterModalContainer = require("../containers/RegisterModalContainer");


function RegisterToggle(props) {
    return (
        <Nav pullRight>
            <RegisterModalContainer onUpdateLogin={props.onUpdateLogin}/>
        </Nav>
    )
}

function NavigationBar(props) {
    return (
        <Navbar fluid staticTop inverse>
            <Navbar.Header>
                <Navbar.Brand>
                    <img style={{padding: "0px", width: "230px"}} src="public/images/musiclogo.png"/>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={1} href="#/">Home</NavItem>
                    <NavItem eventKey={2} href="#/memory_match">Memory Match</NavItem>
                    <NavItem eventKey={3} href="#/perfect_pitch">Perfect Pitch</NavItem>
                    <NavItem eventKey={4} href="#/scoreboard">High Scores</NavItem>

                </Nav>
                {!props.isLoggedIn && <RegisterToggle onUpdateLogin={props.onUpdateLogin}/>}
                <LoginFormContainer isLoggedIn={props.isLoggedIn}
                                    user={props.user}
                                    onUpdateLogin={props.onUpdateLogin}/>
            </Navbar.Collapse>
        </Navbar>
    )
}

NavigationBar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.string,
    onUpdateLogin: PropTypes.func.isRequired
};

module.exports = NavigationBar;