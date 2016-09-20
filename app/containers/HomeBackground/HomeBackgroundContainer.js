import React, { PropTypes, Component } from "react"
import { HomeBackground } from "components"
import update from "react-addons-update"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'

class HomeBackgroundContainer extends Component {
    constructor() {
        super()
        this.parallax = this.parallax.bind(this)
        this.state = {
            bgTop: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.parallax);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.parallax);
    }

    parallax() {
        const bgTop = (0 - (this.props.windowPositionY * .3))
        this.setState({
            bgTop
        })
    }

    render() {
        return (
            <HomeBackground bgTop={this.state.bgTop}/>
        )
    }
}

const { number, func } = PropTypes
HomeBackgroundContainer.propTypes = {
    windowPositionY: number.isRequired,
    //bgTop: number.isRequired,
    //calcBgTop: func.isRequired
}

function mapStateToProps({ scroll }) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBackgroundContainer)