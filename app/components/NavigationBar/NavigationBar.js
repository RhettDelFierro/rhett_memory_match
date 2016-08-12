import React, { PropTypes } from "react"
import { Link } from "react-router"
import { Nav, Navbar, NavItem } from "react-bootstrap"
import { LoginFormContainer } from "containers"
import { RegisterModalContainer } from "containers"
import { container, navContainer, link } from './styles.css'


function RegisterToggle({UpdateLogin}) {
    return (
        <Nav pullRight>
            <RegisterModalContainer />
        </Nav>
    )
}

function NavigationLinks({isAuthed}){
    return isAuthed === true
    ? <ul>
        <li><Link to="/" className={link}>{'Home'}</Link></li>
        <li><Link to="/memory_match" className={link}>{'Memory Match'}</Link></li>
        <li><Link to="/perfect_pitch_training" className={link}>{'Perfect Pitch'}</Link></li>
        <li><Link to="/scoreboard" className={link}>{'High Scores'}</Link></li>
        <li><Link to="/profile" className={link}>{'Profile'}</Link></li>
        <li><Link to="/practice" className={link}>{'Practice'}</Link></li>
    </ul>
        :<ul>
        <li><Link to='/' className={link}>{'Home'}</Link></li>
        <li><Link to='/login' className={link}>{'Login'}</Link></li>
    </ul>
}

function NavigationBar({isAuthed, onUpdateLogin, user}) {
    return (
        <div className={container}>
            <nav className={navContainer}>
                <NavigationLinks isAuthed={isAuthed}/>
            </nav>
        </div>
    )
}

NavigationBar.propTypes = {
    isAuthed: PropTypes.bool.isRequired,
    user: PropTypes.string
};

export default NavigationBar