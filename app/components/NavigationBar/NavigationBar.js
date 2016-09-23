import React, { PropTypes } from "react"
import { Link } from "react-router"
import { Nav, Navbar, NavItem } from "react-bootstrap"
import { LoginFormContainer } from "containers"
import { ModalContainer, NavModalContainer } from "containers"
import { container, navContainer, link, hamburgerContainer, hamburger } from './styles.css'


function RegisterToggle({UpdateLogin}) {
    return (
        <Nav pullRight>
            <RegisterModalContainer />
        </Nav>
    )
}

function NavigationLinks({isAuthed, logout}) {
    //return isAuthed === true
    //    ? <ul>
    //    <li>
    //        <NavModalContainer />
    //    </li>
    //</ul>
    //    : <ul>
    //    <li>
    //        <NavModalContainer />
    //    </li>
    //    <li><Link to='/' className={link}>{'Home'}</Link></li>
    //    <li><ModalContainer/></li>
    //</ul>
    return (
        <ul>
            <li><NavModalContainer/></li>
        </ul>
    )
}

function NavigationBar({isAuthed, authID, user, openModal, logout}) {
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