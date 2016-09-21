import React, { PropTypes, Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'
import { Breaker } from 'components'
import { appInfoContainer, showDiv, hideDiv, appPicture1, train } from './styles.css'

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
        return (
            <div ref={this.props.imageRef} className={appInfoContainer}>
                {this.props.showComponent
                    ?
                    <Breaker title={titleBreaker} image={titleBreakerImage}/>
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