import React, { PropTypes } from "react"
import { container, showDiv, hideDiv } from './styles.css'


//remember to use refs you must use a container component, it will not take a functional component.
function HomeImages ({ showComponent, windowPositionY }) {
        const styles = showComponent ? `${showDiv} animate zoomIn` : `${hideDiv}`

        return (
            <div className={styles}></div>
        )

}

const { number, bool } = PropTypes
HomeImages.propTypes = {
    windowPositionY: number.isRequired,
    showComponent: bool.isRequired
}

export default HomeImages