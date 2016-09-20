import React, { PropTypes, Component } from "react"
import { container } from './styles.css'


//remember to use refs you must use a container component, it will not take a functional component.
function HomeBackground({ bgTop }) {
    const styles = {
        top: `${bgTop}px`
    }
    return (
        <div className={container} style={styles}>
        </div>
    )
}

const { number } = PropTypes
HomeBackground.propTypes = {
    bgTop: number.isRequired
}

export default HomeBackground