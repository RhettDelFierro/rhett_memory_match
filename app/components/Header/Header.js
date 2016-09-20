import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'
import { headerContainer, title, slogan, enterNote } from './styles.css'

class Header extends Component {
    constructor(){
        super()
        this.state = {
            mounted: false
        }
    }

    componentDidMount(){
        this.props.setHeaderHeight({ headerHeight: this.headerNode.offsetHeight})
    }

    render() {
        return (
            <div ref={(ref) => this.headerNode = ref} className={headerContainer}>
                <h1 className={title}>Music app</h1>
                <h2 className={slogan}>Discover the colors of sound</h2>
                <Link to="/demo">
                    <div className={enterNote}></div>
                </Link>
            </div>
        )
    }
}

const { number, func } = PropTypes
Header.propTypes = {
    setHeaderHeight: func.isRequired
}

function mapStateToProps({ scroll }) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)