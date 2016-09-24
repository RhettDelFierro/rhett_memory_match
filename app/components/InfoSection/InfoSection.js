import React, {PropTypes} from 'react'
import { infoSectionContainer, infoImage, infoTitle, infoLeft, infoRight, } from './styles.css'

export default function InfoSection({title, image, slide, show}) {
    //going to change the slide prop.
    const infoClass = slide === 'left' ? `${infoSectionContainer} ${infoLeft}` : `${infoSectionContainer} ${infoRight}`

    var divStyle = {
        backgroundImage: 'url(' + image + ')'
    }

    return (
        show ?
        <div className={infoClass}>
            <div className={infoImage} style={divStyle}></div>
            <h3>{title}</h3>
        </div>
            :
            <div></div>
    )
}

const { string } = PropTypes
InfoSection.propTypes = {
    title: string.isRequired,
    slide: string.isRequired,
    image: string.isRequired
}