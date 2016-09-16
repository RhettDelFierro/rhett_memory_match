import React, { PropTypes } from "react"
import { container, header, background,example, example2, examplea } from './styles.css'


//remember to use refs you must use a container component, it will not take a functional component.
function HomeBackground({ positionY }) {
    const divStyle = {
        top : `${positionY}px`
    }
    return (
        <div className={container} style={divStyle}>
        </div>
    )

}

const { number } = PropTypes
HomeBackground.propTypes = {
    positionY: number.isRequired
}

export default HomeBackground