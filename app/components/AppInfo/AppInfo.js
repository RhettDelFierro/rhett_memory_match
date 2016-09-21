import React, { PropTypes, Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'
import { Breaker, InfoSection } from 'components'
import { appInfoContainer, showDiv, hideDiv, appPicture1, train, wholeInfoContainer } from './styles.css'

class AppInfo extends Component {
    constructor() {
        super()
    }

    //const styles = showComponent ? `${container} ${animate} ${slideInLeft}` : `${hideDiv}


    //scroll() {
    //    this.props.setHomeImagesTop({ homeImagesTop: this.props.imageRef.offsetTop })
    //    this.props.setHomeImagesBottom({homeImagesBottom: this.imageContainer.offsetTop + this.imageContainer.offsetHeight})
    //}

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const titleBreaker = 'Train Your Ears'
        const titleBreakerImage = require('assets/images/breaker-musicnote.png')

        //mention the study results too.
        const infoDescription = 'Train Your Ears is an app based on the research done by University of Chicago studying if learning this skill is possible.'
        const infoImage = require('assets/images/Perfect_Pitch_training.png')

        const infoDescription2 = 'Discover the keys some of your favorite songs were composed in afterward!'
        const infoImage2 = require('assets/images/getnotes.png')

        return (
            <div ref={this.props.imageRef} className={appInfoContainer}>
                {this.props.showComponent
                    ? <div>
                        <Breaker title={titleBreaker} image={titleBreakerImage}/>
                        <div className={wholeInfoContainer}>
                            <InfoSection align="left" image={infoImage} description={infoDescription} />
                            <InfoSection align="right" image={infoImage2} description={infoDescription2}/>
                        </div>
                      </div>
                    :
                    <div ref={(node) => this.node1 = node}></div>
                }
            </div>
        )
    }
}

const { number, func } = PropTypes
AppInfo.propTypes = {
    windowPositionY: number.isRequired,
    bgTop: number.isRequired,
    homeImagesTop: number.isRequired,
    setHomeImagesTop: func.isRequired,
    setHomeImagesBottom: func.isRequired,
    imageRef: func.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        windowPositionY: scroll.get('windowPositionY'),
        bgTop: scroll.get('bgTop'),
        homeImagesTop: scroll.get('homeImagesTop'),
        homeImagesBotton: scroll.get('homeImagesBottom')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppInfo)