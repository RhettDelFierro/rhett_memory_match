import React, { PropTypes } from "react"
import { Link } from "react-router"
import { Nav, Navbar, NavItem } from "react-bootstrap"
import LoginFormContainer from "../containers/LoginFormContainer"
import RegisterModalContainer from "../containers/RegisterModalContainer"


function RegisterToggle({UpdateLogin}) {
    return (
        <Nav pullRight>
            <RegisterModalContainer onUpdateLogin={UpdateLogin}/>
        </Nav>
    )
}

function NavigationBar({isLoggedIn, onUpdateLogin, user}) {
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
                {!isLoggedIn && <RegisterToggle onUpdateLogin={onUpdateLogin}/>}
                <LoginFormContainer isLoggedIn={isLoggedIn}
                                    user={user}
                                    onUpdateLogin={onUpdateLogin}/>
            </Navbar.Collapse>
        </Navbar>
    )
}

NavigationBar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.string,
    onUpdateLogin: PropTypes.func.isRequired
};

export default NavigationBar