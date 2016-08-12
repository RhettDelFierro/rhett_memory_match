import React, { PropTypes } from "react"
import { Link } from "react-router"
import { Nav, Navbar, NavItem } from "react-bootstrap"
import { LoginFormContainer } from "containers"
import { RegisterModalContainer } from "containers"
import { container } from './styles.css'


function RegisterToggle({UpdateLogin}) {
    return (
        <Nav pullRight>
            <RegisterModalContainer />
        </Nav>
    )
}

function NavigationBar({isAuthed, onUpdateLogin, user}) {
    return (
        <div className={container}>
            some blah blah
        </div>
    )
}

NavigationBar.propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    user: PropTypes.string
};

export default NavigationBar