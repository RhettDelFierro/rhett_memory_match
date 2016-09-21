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
    return isAuthed === true
        ? <ul>
        <li><Link to="/" className={link}>{'Home'}</Link></li>
        <li><Link to="/memory_match" className={link}>{'Memory Match'}</Link></li>
        <li><Link to="/perfect_pitch_training" className={link}>{'Perfect Pitch'}</Link></li>
        <li><Link to="/scoreboard" className={link}>{'High Scores'}</Link></li>
        <li><Link to="/profile" className={link}>{'Profile'}</Link></li>
        <li><Link to="/practice" className={link}>{'Practice'}</Link></li>
        <li><span onClick={logout}>{'LogOut'}</span></li>
    </ul>
        : <ul>
        <li>
            <NavModalContainer />
        </li>
        <li><Link to='/' className={link}>{'Home'}</Link></li>
        <li><ModalContainer/></li>
    </ul>
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