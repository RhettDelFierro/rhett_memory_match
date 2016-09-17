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
    }

    componentWillReceiveProps(newProps) {
        //the offsetparent will be the top of the browser
        if (window.scrollY > this.props.homeImagesTop) {
            this.setState({
                showComponent: true
            })
        } else {
            this.setState({
                showComponent: false
            })
        }
    }

    //componentDidMount() {
    //    window.addEventListener('scroll',this.displayComponent);
    //}
    //
    //componentWillUnmount() {
    //    window.removeEventListener('scroll',this.displayComponent);
    //
    //}

    render() {
        const styles = this.state.showComponent ? `${container} animate zoomIn` : `${hideDiv}`
        //<HomeImages windowPositionY={this.props.windowPositionY}
        //            showComponent={this.state.showComponent}/>
        return (
            <HomeImages showComponent={this.state.showComponent}/>
        )
    }
}

const { number, func } = PropTypes
HomeImagesContainer.propTypes = {
    windowPositionY: number.isRequired,
    homeBackgroundPositionY: number.isRequired,
    homeImagesTop: number.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        windowPositionY: scroll.get('windowPositionY'),
        homeBackgroundPositionY: scroll.get('homeBackgroundPositionY'),
        homeImagesTop: scroll.get('homeImagesTop')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeImagesContainer)