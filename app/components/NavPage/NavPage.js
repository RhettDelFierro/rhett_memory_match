import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import { ModalContainer } from 'containers'
import { navPageContainer, link, pointer, closeX } from './styles.css'
import { List } from 'immutable'

function NavPage({isAuthed, logout, closeNavModal}) {
    const routes = List(['perfect_pitch_training', 'scoreboard', 'profile', 'practice'])
        //<li><Link to="/perfect_pitch_training" className={link}>{'Perfect Pitch Training'}</Link></li>
        //<li><Link to="/scoreboard" className={link}>{'High Scores'}</Link></li>
        //<li><Link to="/profile" className={link}>{'Profile'}</Link></li>
        //<li><Link to="/practice" className={link}>{'Practice'}</Link></li>
    return isAuthed === true
        ?
        <div className={navPageContainer}>
            <ul>
                <li><Link to="/" className={link}>{'Home'}</Link></li>
                {routes.map((item,i) => <NavElement name={item} key={item}/>)}
                <li><span onClick={logout}>{'LogOut'}</span></li>
                <li className={closeX}><span onClick={closeNavModal} className="glyphicon glyphicon-remove">{'Return'}</span></li>
            </ul>
        </div>
        :
        <div className={navPageContainer}>
            <ul>
                <li><Link to='/' className={link}>{'Home'}</Link></li>
                <li><ModalContainer/></li>
                <li className={closeX}><span onClick={closeNavModal} className="glyphicon glyphicon-remove">{'Return'}</span></li>
            </ul>
        </div>
}

function NavElement({name}) {
    const link = `/${name}`
    const routeName = name.split('_')
    const title = []
    const name_map = routeName.reduce((prev,item) => {
        return prev.concat(item.replace(item[0],item[0].toUpperCase()))
    },title )
    const fullTitle = name_map.join(' ')

    return (
        <li><Link to={link} className={link}>{fullTitle}></Link></li>
    )
}

const { bool, func } = PropTypes
NavPage.proptypes = {
    isAuthed: bool.isRequired,
    logout: bool.isRequired,
    closeNavModal: func.isRequired
}

export default NavPage