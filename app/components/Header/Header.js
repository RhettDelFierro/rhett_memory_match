import React, {PropTypes} from 'react'
import { Link } from 'react-router'
import { headerContainer, title, slogan, enterNote } from './styles.css'

function Header(props) {
    return (
        <div className={headerContainer}>
            <h1 className={title}>Music app</h1>
            <h2 className={slogan}>Discover the colors of sound</h2>
            <Link to="/demo">
                <div className={enterNote}></div>
            </Link>
        </div>
    )
}

export default Header