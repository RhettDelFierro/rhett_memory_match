import React, {PropTypes} from 'react'
import { infoContainer, infoImage, infoDescription, infoLeft,
    infoRight, imageLeft, imageRight, descriptionLeft, descriptionRight } from './styles.css'

export default function InfoSection({description, image, align}) {
    const infoClass = align === 'left' ? `${infoContainer} ${infoLeft}` : `${infoContainer} ${infoRight}`

    const descriptionClass = align === 'left'
        ? `${infoDescription} ${descriptionLeft}`
        : `${infoDescription} ${descriptionRight}`

    const imageClass = align === 'left' ? `${infoImage} ${imageLeft}` : `${infoImage} ${imageRight}`

    var divStyle = {
        backgroundImage: 'url(' + image + ')'
    }

    return (
        <div className={infoClass}>
            <p className={descriptionClass}>{description}</p>
            <div className={imageClass} style={divStyle}></div>
        </div>
    )
}

const { string } = PropTypes
InfoSection.propTypes = {
    description: string.isRequired,
    align: string.isRequired,
    image: string.isRequired
}