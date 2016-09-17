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
    }

    componentDidMount() {
        window.addEventListener('scroll',this.parallax);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',this.parallax);

    }

    parallax() {
        this.props.setBgTop({ fromTop: window.scrollY })
    }

    render() {
        return (
            <HomeBackground bgTop={this.props.bgTop}/>
        )
    }
}

const { number, func } = PropTypes
HomeBackgroundContainer.propTypes = {
    bgTop: number.isRequired,
    setBgTop: func.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        bgTop: scroll.get('bgTop')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBackgroundContainer)