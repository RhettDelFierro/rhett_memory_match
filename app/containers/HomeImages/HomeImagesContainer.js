import React, { PropTypes, Component } from "react"
import { HomeImages } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'

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
        if (newProps.windowPositionY + 300 == this.imageContainer.offsetTop) {
            this.setState({
                showComponent: true
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
        return (
            <div ref={(ref) => this.imageContainer = ref}>
                <HomeImages windowPositionY={this.props.windowPositionY}
                            showComponent={this.state.showComponent}/>
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