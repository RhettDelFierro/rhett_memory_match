import React, { PropTypes } from "react"
import { Link } from "react-router"
import { Nav, Navbar, NavItem } from "react-bootstrap"
import { LoginFormContainer } from "containers"
import { ModalContainer, NavModalContainer } from "containers"
import { hideNav, container, navContainer, link, hamburgerContainer, hamburger } from './styles.css'

function NavigationLinks({isAuthed, logout}) {
    return (
        <ul>
            <li><NavModalContainer/></li>
        </ul>
    )
}

function NavigationBar({isAuthed, authID, user, openModal, logout, isNavOpen}) {
    return (
        <div className={container}>
            <nav className={navContainer}>
                <NavigationLinks isAuthed={isAuthed} logout={logout}/>
            </nav>
        </div>
    )
}

NavigationBar.propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    user: PropTypes.string,
    logout: PropTypes.func.isRequired
};

export default NavigationBar