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
    }

    render() {
        return (
            <Home />
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