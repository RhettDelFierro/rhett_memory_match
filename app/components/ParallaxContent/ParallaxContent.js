import React, { PropTypes } from "react"
import { container } from './styles.css'
import { HomeImagesContainer } from 'containers'


//remember to use refs you must use a container component, it will not take a functional component.
function ParallaxContent({ positionY }) {
    const divStyle = {
        top : `${positionY}px`
    }
    return (
        <div className={container} style={divStyle}>
            <HomeImagesContainer />
        </div>
    )

}

const { number } = PropTypes
ParallaxContent.propTypes = {
    windowPositionY: number.isRequired,
    positionY: number.isRequired
}

export default ParallaxContent