import React, { PropTypes, Component } from "react"
import { HomeImages } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'
import { container, showDiv, hideDiv, picture1 } from './styles.css'

class HomeImagesContainer extends Component {
    constructor() {
        super()
        //this.parallax = this.parallax.bind(this)
        //this.displayComponent = this.displayComponent.bind(this)
        this.state = {
            showComponent: false
        }
        this.showHomeImages = this.showHomeImages.bind(this)
    }

    //this code goes away on any upscroll and visible on any downscroll.
    //showHomeImages(){
    //    let { showComponent } = this.state
    //    this.props.windowPositionY > this.prev
    //        ? !showComponent && this.setState({showComponent:true})
    //        : showComponent && this.setState({showComponent:false})
    //
    //    this.prev = this.props.windowPositionY;
    //
    //    if (this.state.showComponent === true) {
    //        console.log('great!')
    //    }
    //}

    showHomeImages() {
        // && (this.props.windowPositionY < this.props.homeImagesBottom))
        if (((this.props.windowPositionY > this.props.homeImagesTop)
            || (this.props.windowPositionY < this.props.homeImagesBottom))
            && (this.props.windowPositionY < this.props.homeImagesBottom)) {
            this.setState({showComponent: true})
        } else {
            this.setState({showComponent: false})
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.showHomeImages);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.showHomeImages);
    }

    render() {
        return (
            <HomeImages showComponent={this.state.showComponent}/>
        )
    }
}

const { number, func } = PropTypes
HomeImagesContainer.propTypes = {
    windowPositionY: number.isRequired,
    bgTop: number.isRequired,
    homeImagesTop: number.isRequired,
    homeImagesBottom: number.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        windowPositionY: scroll.get('windowPositionY'),
        bgTop: scroll.get('bgTop'),
        homeImagesTop: scroll.get('homeImagesTop'),
        homeImagesBottom: scroll.get('homeImagesBottom')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeImagesContainer)