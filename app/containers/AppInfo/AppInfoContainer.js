import React, { PropTypes, Component } from "react"
import { AppInfo } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'


//<----------------REPLACE HomeImageS WITH AppInfo here and in Redux ------------------->


class AppInfoContainer extends Component {
    constructor() {
        super()
        this.state = {
            showComponent: false
        }
        this.showHomeImages = this.showHomeImages.bind(this)
    }

    showHomeImages() {
        if ((window.pageYOffset > this.props.homeImagesTop/4)
            && (window.pageYOffset < this.props.homeImagesBottom)) {
            this.setState({showComponent: true})
            //this.imageNode.scrollIntoView()
        } else {
            this.setState({showComponent: false})
        }
    }

    scrollElement() {
        window.requestAnimationFrame(() => {
            var node = this.imageNode
            if (node !== undefined) {
                //and scroll them!
                this.props.setHomeImagesTop({homeImagesTop: this.imageNode.offsetTop})
                this.props.setHomeImagesBottom({homeImagesBottom: this.imageNode.offsetTop + this.imageNode.offsetHeight})
            }
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.showHomeImages);
        setTimeout(() => this.scrollElement())
    }

    componentDidUpdate() {
        this.scrollElement();
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.showHomeImages);
    }

    render() {
        return (
            <AppInfo imageRef={(node) => this.imageNode = node} showComponent={this.state.showComponent}/>
        )
    }
}

const { number, func, bool } = PropTypes
AppInfoContainer.propTypes = {
    homeImagesTop: number.isRequired,
    homeImagesBottom: number.isRequired,
    setHomeImagesTop: func.isRequired,
    setHomeImagesBottom: func.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        homeImagesTop: scroll.get('homeImagesTop'),
        homeImagesBottom: scroll.get('homeImagesBottom')
        //appInfoBreaker: scroll.get('appInfoBreaker')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppInfoContainer)