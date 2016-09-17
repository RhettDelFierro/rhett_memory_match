import React, { PropTypes, Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'
import { container, showDiv, hideDiv, picture1 } from './styles.css'


//remember to use refs you must use a container component, it will not take a functional component.
class HomeImages extends Component {

    componentDidMount() {
        this.props.setTopHomeImages({ homeImagesTop: this.imageContainer.offsetTop })
    }

    render() {
        const styles = this.props.showComponent ? `${container} animate zoomIn` : `${hideDiv}`
        return (
            <div className={styles} ref={(ref) => this.imageContainer = ref}>
                <div className={picture1}></div>
            </div>
        )
    }
}

const { number, bool, func } = PropTypes

HomeImages.propTypes = {
    windowPositionY: number.isRequired,
    showComponent: bool.isRequired,
    setTopHomeImages: func.isRequired,
    bgTop: number.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        windowPositionY: scroll.get('windowPositionY'),
        bgTop: scroll.get('bgTop')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeImages)