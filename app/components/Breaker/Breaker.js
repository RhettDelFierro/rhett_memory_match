import React, {PropTypes} from 'react'
import { breakerContainer, breakerContainerLeft, hideBreaker } from './breakerStyles.css'
import { lineBreakContainer, lineBreak, breakerImage, breakerImageLeft } from './lineBreakStyles.css'

export default function Breaker({title, show, type}) {
    const breakAlign = type === 'appInfo' ? `${breakerContainer}` : `${breakerContainerLeft}`
    return (
        show ?
            <div className={breakAlign}>
                <h3>{title}</h3>
                <LineBreak type={type} />
            </div>
            :
            <div className={hideBreaker}></div>

    )
}

function LineBreak({type}) {
    const lineImage = type === 'appInfo' ? `${breakerImage}` : `${breakerImageLeft}`
    return (
        <div className={lineBreakContainer}>
            <hr className={lineBreak}/>
            <div className={lineImage}></div>
        </div>
    )
}

const { string, bool } = PropTypes
LineBreak.propTypes = {
    type: string.isRequired
}

Breaker.propTypes = {
    title: string.isRequired,
    type: string.isRequired,
    show: bool.isRequired
    //appInfoBreaker: bool.isRequired,
    //appPicturesBreaker: bool.isRequired
}
