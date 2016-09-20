import React, {PropTypes} from 'react'
import { headerContainer, title, slogan } from './styles.css'

function Header(props) {
    return (
        <div className={headerContainer}>
            <h1 className={title}>Music app</h1>
            <h2 className={slogan}>Discover the colors of sound</h2>
        </div>
    )
}

export default Header