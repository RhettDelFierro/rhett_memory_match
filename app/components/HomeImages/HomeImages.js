import React, { PropTypes, Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'
import { container, showDiv, hideDiv, appPicture1 } from './styles.css'

class HomeImages extends Component {
    constructor() {
        super()
        //this.scroll = this.scroll.bind(this)
    }

    //const styles = showComponent ? `${container} ${animate} ${slideInLeft}` : `${hideDiv}


    //scroll() {
    //    this.props.setHomeImagesTop({ homeImagesTop: this.props.imageRef.offsetTop })
    //    this.props.setHomeImagesBottom({homeImagesBottom: this.imageContainer.offsetTop + this.imageContainer.offsetHeight})
    //}

    componentDidMount() {
        this.props.setHomeImagesTop({homeImagesTop: this.props.imageRef.offsetTop})
        this.props.setHomeImagesBottom({homeImagesBottom: this.props.imageRef.offsetTop + this.props.imageRef.offsetHeight})
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll);
    }

    render() {
        //this.props.showComponent
        //    ? <div ref={(ref) => this.imageContainer = ref} className={container}>
        //    <div className={appPicture1}></div>
        //</div>
        //    : <div></div>
        return (
            <div ref={(ref) => this.props.imageRef} className={container}>
                {this.props.showComponent
                    ?
                    <div className={appPicture1}></div>
                    :
                    <div></div>
                }
            </div>
        )
    }
}

const { number, func } = PropTypes
HomeImages.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeImages)