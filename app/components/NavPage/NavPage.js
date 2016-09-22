import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import { ModalContainer } from 'containers'
import { navPageContainer, link, pointer } from './styles.css'


function NavPage({isAuthed, logout, closeNavModal}) {
    return isAuthed === true
        ?
        <div className={navPageContainer}>
            <ul>
                <li><Link to="/" className={link}>{'Home'}</Link></li>
                <li><Link to="/memory_match" className={link}>{'Memory Match'}</Link></li>
                <li><Link to="/perfect_pitch_training" className={link}>{'Perfect Pitch'}</Link></li>
                <li><Link to="/scoreboard" className={link}>{'High Scores'}</Link></li>
                <li><Link to="/profile" className={link}>{'Profile'}</Link></li>
                <li><Link to="/practice" className={link}>{'Practice'}</Link></li>
                <li><span onClick={logout}>{'LogOut'}</span></li>
            </ul>
        </div>
        :
        <div className={navPageContainer}>
            <ul>
                <li><Link to='/' className={link}>{'Home'}</Link></li>
                <li><ModalContainer/></li>
                <li><span onClick={closeNavModal} className="glyphicon glyphicon-remove">{''}</span></li>
            </ul>
        </div>
}

const { bool, func } = PropTypes
NavPage.proptypes = {
    isAuthed: bool.isRequired,
    logout: bool.isRequired,
    closeNavModal: func.isRequired
}

export default NavPage