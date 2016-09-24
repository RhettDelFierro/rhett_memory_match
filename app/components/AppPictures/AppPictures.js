import React, {PropTypes, Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'
import { Breaker, InfoSection } from 'components'
import { appPicContainer, lineBreak, breakImage } from './styles.css'

class AppPictures extends Component {
    constructor() {
        super()
    }

    //<Breaker /> will go here.
    render() {
        const divStyle = {backgroundImage: 'url(' + 'props.image' + ')'}
        const breakerTitle = 'Learn'
        const breakerImage = require('assets/images/lightbulb.png')
        const info1 = 'Train'
        const infoImage = require('assets/images/Perfect_Pitch_training.png')
        const info2 = 'Listen'
        const infoImage2 = require('assets/images/getsongnotes.png')

        return (
            <div ref={this.props.appPicRef} className={appPicContainer}>
                <Breaker show={this.props.showComponent} title={breakerTitle} image={breakerImage}/>
                <InfoSection show={this.props.showComponent} slide="left" image={infoImage} title={info1}/>
                <InfoSection show={this.props.showComponent} slide="right" image={infoImage2} title={info2}/>
            </div>



        )
    }
}

const { number, func, string, bool } = PropTypes
AppPictures.propTypes = {
    appPicturesTop: number.isRequired,
    image: string,
    setAppPicturesTop: func.isRequired,
    setAppPicturesBottom: func.isRequired,
    appPicRef: func.isRequired,
    showComponent: bool.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        appPicturesTop: scroll.get('appPicturesTop'),
        appPicturesBottom: scroll.get('appPicturesBottom')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppPictures)