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
        console.log('imageContainer:', this.imageContainer.offsetTop)
        console.log('window', newProps.windowPositionY)
        //the offsetparent will be the top of the browser
        if (window.scrollY > this.imageContainer.offsetTop) {
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
            <div ref={(ref) => this.imageContainer = ref} className={styles}>
                <div className={picture1}></div>
            </div>
        )
    }
}

const { number, func } = PropTypes
HomeImagesContainer.propTypes = {
    windowPositionY: number.isRequired,
    homeBackgroundPositionY: number.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        windowPositionY: scroll.get('windowPositionY'),
        homeBackgroundPositionY: scroll.get('homeBackgroundPositionY')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeImagesContainer)