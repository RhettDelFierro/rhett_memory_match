import React, {PropTypes} from 'react'
import { breakerContainer, lineBreak, breakImage } from './styles.css'

export default function Breaker(props) {
    return (
        <div className={breakerContainer}>
            <h3>Train Your Ears</h3>
            <hr className={lineBreak}/>
            <div className={breakImage}></div>
        </div>
    )
}
