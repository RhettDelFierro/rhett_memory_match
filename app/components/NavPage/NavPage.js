import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import { ModalContainer } from 'containers'
import { navPageContainer, link, pointer, closeX } from './styles.css'
import { List } from 'immutable'

function NavPage({isAuthed, logout, closeNavModal}) {
    const routes = List(['perfect_pitch_training', 'scoreboard', 'profile', 'practice'])

    return isAuthed === true
        ?
        <div className={navPageContainer}>
            <ul>
                <li><Link to="/" className={link} onClick={closeNavModal}>{'Home'}</Link></li>
                {routes.map((item,i) => <NavElement name={item} closeNavModal={closeNavModal} key={i} />)}
                <li><span onClick={logout}>{'LogOut'}</span></li>
                <li className={closeX}><span onClick={closeNavModal} className="glyphicon glyphicon-remove">{'Return'}</span></li>
            </ul>
        </div>
        :
        <div className={navPageContainer}>
            <ul>
                <li><Link to='/' className={link} onClick={closeNavModal}>{'Home'}</Link></li>
                <li><ModalContainer/></li>
                <li className={closeX}><span onClick={closeNavModal} className="glyphicon glyphicon-remove">{'Return'}</span></li>
            </ul>
        </div>
}

function NavElement({ name, closeNavModal }) {
    const route = `/${name}`
    const routeName = name.split('_')
    const title = []
    const name_map = routeName.reduce((prev,item) => {
        return prev.concat(item.replace(item[0],item[0].toUpperCase()))
    },title )
    const fullTitle = name_map.join(' ')

    return (
        <li>
            <Link to={route} className={link} onClick={closeNavModal}>{fullTitle}</Link>
        </li>
    )
}

const { bool, func } = PropTypes
NavPage.proptypes = {
    isAuthed: bool.isRequired,
    logout: bool.isRequired,
    closeNavModal: func.isRequired
}

export default NavPage