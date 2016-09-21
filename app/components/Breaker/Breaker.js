import React, {PropTypes} from 'react'
import { breakerContainer, lineBreak, breakImage } from './styles.css'

export default function Breaker({title,image}) {
    var divStyle = {
        backgroundImage: 'url(' + image + ')'
    }

    return (
        <div className={breakerContainer}>
            <h3>{title}</h3>
            <hr className={lineBreak}/>
            <div className={breakImage} style={divStyle}></div>
        </div>
    )
}
