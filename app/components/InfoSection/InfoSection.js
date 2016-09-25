import React, {PropTypes} from 'react'
import { infoSectionContainer, infoImage, infoTitle, infoLeft, infoRight, infoDescription, hideInfoSection } from './styles.css'
import connect from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux'

function InfoSection({ title, image, slide, show, description, changeRoute }) {
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
            <p className={infoDescription}>{description}</p>
        </div>
            :
            <div className={hideInfoSection}></div>
    )
}

const { string, func } = PropTypes
InfoSection.propTypes = {
    title: string.isRequired,
    slide: string.isRequired,
    image: string.isRequired,
    //changeRoute: func.isRequired
}

//function mapDispatchToProps(dispatch) {
//    return bindActionCreators(
//        {
//            changeRoute: (url) => push(url),
//            dispatch
//        }
//    )
//}

export default InfoSection