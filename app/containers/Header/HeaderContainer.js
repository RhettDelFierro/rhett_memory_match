import React, { PropTypes, Component } from "react"
import { Header } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'

class HeaderContainer extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
        console.log('headerNode:', this.headerNode.offsetHeight)
        this.props.setHeaderHeight({ headerHeight: this.headerNode.offsetHeight })
    }

    render() {
        return (
            <Header headerRef={(node) => this.headerNode = node}/>
        )
    }
}

const { number, func } = PropTypes
HeaderContainer.propTypes = {
    setHeaderHeight: func.isRequired,
}

function mapStateToProps({ scroll }) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)