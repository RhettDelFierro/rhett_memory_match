import React, { PropTypes, Component } from "react"
import { AppInfo } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'
import { container, showDiv, hideDiv, picture1 } from './styles.css'

class AppInfoContainer extends Component {
    constructor() {
        super()
        //this.parallax = this.parallax.bind(this)
        //this.displayComponent = this.displayComponent.bind(this)
        this.state = {
            showComponent: false
        }
        //this.showHomeImages = this.showHomeImages.bind(this)
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

    componentWillReceiveProps(newProps){
        this.props.setHomeImagesTop({homeImagesTop: newProps.headerHeight})
    }
    //showHomeImages() {
    //    // && (this.props.windowPositionY < this.props.homeImagesBottom))
    //    if (((window.scrollY > this.props.homeImagesTop)
    //        || (window.scrollY < this.props.homeImagesBottom))
    //        && (window.scrollY < this.props.homeImagesBottom)) {
    //        this.setState({showComponent: true})
    //        //this.imageNode.scrollIntoView()
    //    } else {
    //        this.setState({showComponent: false})
    //    }
    //}

    //showHomeImages() {
    //    if ((window.scrollY > this.imageNode.offsetTop
    //        || window.scrollY < this.imageNode.offsetTop + this.imageNode.offsetheight)
    //    && window.scrollY < this.imageNode.) {
    //
    //    }
    //}

    componentDidMount() {
        window.addEventListener('scroll', this.showHomeImages);
        //this.props.setHomeImagesTop({homeImagesTop: this.imageNode.offsetTop})
        //this.props.setHomeImagesBottom({homeImagesBottom: this.imageNode.offsetTop + this.imageNode.offsetHeight})
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.showHomeImages);
    }

    render() {
        return (
            <AppInfo imageRef={(node) => this.imageNode = node} showComponent={this.state.showComponent}/>
        )
    }
}

const { number, func } = PropTypes
AppInfoContainer.propTypes = {
    windowPositionY: number.isRequired,
    bgTop: number.isRequired,
    homeImagesTop: number.isRequired,
    homeImagesBottom: number.isRequired,
    setHomeImagesTop: func.isRequired,
    setHomeImagesBottom: func.isRequired,
    headerHeight: number.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        windowPositionY: scroll.get('windowPositionY'),
        bgTop: scroll.get('bgTop'),
        homeImagesTop: scroll.get('homeImagesTop'),
        homeImagesBottom: scroll.get('homeImagesBottom'),
        headerHeight: scroll.get('headerHeight')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppInfoContainer)