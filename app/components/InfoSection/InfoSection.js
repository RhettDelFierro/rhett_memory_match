import React, {PropTypes} from 'react'
import { infoSectionContainer, infoImage, infoTitle, infoLeft, infoRight, infoDescription, hideInfoSection, toTraining } from './styles.css'
import connect from 'react-redux'
import { bindActionCreators } from 'redux'

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
                <div className={infoDescription}><p>{description}</p></div>
                <div className={toTraining} onClick={() => changeRoute('/perfect_pitch_training')}>
                    <h3>{title}</h3>
                </div>
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
    changeRoute: func.isRequired
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

//export default connect(null,{changeRoute: (url) => dispatch(push(url))})(InfoSection)
export default InfoSection