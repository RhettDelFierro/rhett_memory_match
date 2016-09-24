import React, {PropTypes} from 'react'
import { LineBreak } from 'components'
import { breakerContainer, lineBreak, breakImage, hideBreaker } from './styles.css'

export default function Breaker({title, image, show}) {
    var divStyle = {
        backgroundImage: 'url(' + image + ')'
    }

    return (
        show ?
            <div className={breakerContainer}>
                <h3>{title}</h3>
                <LineBreak image={image}/>
            </div>
            :
            <div className={hideBreaker}></div>

    )
}

const { string } = PropTypes
Breaker.propTypes = {
    title: string.isRequired,
    image: string.isRequired
}
