import React, {PropTypes} from 'react'
import { parallaxContainer, parallaxInner, parallaxHeading, parallaxSub } from './styles.css'

function Parallax(props) {
    return (
        <div className={parallaxContainer}>
            <div className={parallaxInner}>
                <h1 className={parallaxHeading}>See Colorful Sounds</h1>
                <h4 className={parallaxSub}>Just like a (clear) night sky!</h4>
            </div>
        </div>
    )
}

export default Parallax