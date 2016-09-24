import React, { PropTypes, Component } from "react"
import { AppPictures } from "components"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'

class AppPicturesContainer extends Component {
    constructor() {
        super()
        this.state = {
            showComponent: false
        }
        this.showAppPictures = this.showAppPictures.bind(this)
    }

    showAppPictures() {
        if ((window.pageYOffset > this.props.appPicturesTop/4)
            && (window.pageYOffset < this.props.appPicturesBottom)) {
            this.setState({showComponent: true})
            //this.appPicturesNode.scrollIntoView()
        } else {
            this.setState({showComponent: false})
        }
    }

    scrollElement() {
        window.requestAnimationFrame(() => {
            var node = this.appPicturesNode
            if (node !== undefined) {
                //and scroll them!
                this.props.setAppPicturesTop({appPicturesTop: this.appPicturesNode.offsetTop})
                this.props.setAppPicturesBottom({appPicturesBottom: this.appPicturesNode.offsetTop + this.appPicturesNode.offsetHeight})
            }
        });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.showAppPictures);
        setTimeout(() => this.scrollElement())
    }

    componentDidUpdate() {
        this.scrollElement();
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.showAppPictures);
    }

    render() {
        return (
            <AppPictures appPicRef={(node) => this.appPicturesNode = node} showComponent={this.state.showComponent}/>
        )
    }
}

const { number, func } = PropTypes
AppPicturesContainer.propTypes = {
    appPicturesTop: number,
    appPicturesBottom: number,
    setAppPicturesTop: func.isRequired,
    setAppPicturesBottom: func.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        AppPicturesTop: scroll.get('appPicturesTop'),
        AppPicturesBottom: scroll.get('appPicturesBottom')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppPicturesContainer)