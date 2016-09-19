//will contain <StudentFormContainer> <TableContainer>
import React, { PropTypes, Component } from "react"
import { Home } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'

class HomeContainer extends Component {
    constructor() {
        super()
        this.scrollPosition = this.scrollPosition.bind(this)
        this.state = {
            windowPositionY: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll',this.scrollPosition);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',this.scrollPosition);

    }

    scrollPosition() {
        this.setState({
            windowPositionY: window.scrollY
        })
    }

    render() {
        return (
            <Home windowPositionY={this.state.windowPositionY}/>
        )
    }
}

const { number, func } = PropTypes
HomeContainer.propTypes = {
}

function mapStateToProps({ scroll }) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)