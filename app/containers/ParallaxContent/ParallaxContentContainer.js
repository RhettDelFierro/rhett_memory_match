import React, { PropTypes, Component } from "react"
import { ParallaxContent } from "components"
import update from "react-addons-update"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'

class ParallaxContentContainer extends Component {
    constructor() {
        super()
        this.parallax = this.parallax.bind(this)
    }

    componentDidMount() {
        window.addEventListener('scroll',this.parallax);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',this.parallax);

    }

    parallax() {
        this.props.calculateParallaxContentPositionY()
    }

    render() {
        return (
            <ParallaxContent positionY={this.props.parallaxContentPositionY} windowPositionY={this.props.windowPositionY}/>
        )
    }
}

const { number, func } = PropTypes
ParallaxContentContainer.propTypes = {
    windowPositionY: number.isRequired,
    parallaxContentPositionY: number.isRequired,
    calculateParallaxContentPositionY: func.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        windowPositionY: scroll.get('windowPositionY'),
        parallaxContentPositionY: scroll.get('parallaxContentPositionY')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ParallaxContentContainer)