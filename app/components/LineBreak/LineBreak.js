import React, {PropTypes} from 'react'
import { breakContainer, lineBreak, breakImage } from './styles.css'

export default function LineBreak({image}) {
    var divStyle = {
        backgroundImage: 'url(' + image + ')'
    }

    return (
        <div className={breakContainer}>
            <hr className={lineBreak}/>
            <div className={breakImage} style={divStyle}></div>
        </div>
    )
}

const { string } = PropTypes
LineBreak.propTypes = {
    image: string.isRequired
}
