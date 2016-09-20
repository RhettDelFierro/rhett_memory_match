import React, { PropTypes, Component } from "react"
import { AppInfo } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'
import { container, showDiv, hideDiv, picture1 } from './styles.css'

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
        var self = this;
        window.requestAnimationFrame(function () {
            var node = self.imageNode
            if (node !== undefined) {
                //and scroll them!
                self.props.setHomeImagesTop({homeImagesTop: self.imageNode.offsetTop})
                self.props.setHomeImagesBottom({homeImagesBottom: self.imageNode.offsetTop + self.imageNode.offsetHeight})
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

const { number, func } = PropTypes
AppInfoContainer.propTypes = {
    windowPositionY: number.isRequired,
    bgTop: number.isRequired,
    homeImagesTop: number.isRequired,
    homeImagesBottom: number.isRequired,
    setHomeImagesTop: func.isRequired,
    setHomeImagesBottom: func.isRequired,
    headerHeight: number.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        windowPositionY: scroll.get('windowPositionY'),
        bgTop: scroll.get('bgTop'),
        homeImagesTop: scroll.get('homeImagesTop'),
        homeImagesBottom: scroll.get('homeImagesBottom'),
        headerHeight: scroll.get('headerHeight')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppInfoContainer)