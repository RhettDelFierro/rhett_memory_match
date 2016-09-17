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
    }

    componentDidMount() {
        window.addEventListener('scroll',this.scrollPosition);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',this.scrollPosition);

    }

    scrollPosition() {
        this.props.getWindowPositionY({fromTop: window.scrollY})
    }

    render() {
        return (
            <Home />
        )
    }
}

const { number, func } = PropTypes
HomeContainer.propTypes = {
    windowPositionY: number.isRequired,
    getWindowPositionY: func.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        windowPositionY: scroll.get('windowPositionY')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)