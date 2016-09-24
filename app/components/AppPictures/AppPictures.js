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
        const divStyle = {
            backgroundImage: 'url(' + 'props.image' + ')'
        }
        const breakerTitle = 'Learn'
        const breakerImage= require('assets/images/lightbulb.png')
        const info1 = 'Train'
        const infoImage = require('assets/images/Perfect_Pitch_training.png')
        const info2 = 'Listen'
        const infoImage2 = require('assets/images/getsongnotes.png')

        return (
            <div ref={this.props.appPicRef} className={appPicContainer}>
                {this.props.showComponent
                    ?
                    <div>
                        <Breaker title={breakerTitle} image={breakerImage}/>
                        <InfoSection slide="left" image={infoImage} title={info1}/>
                        <InfoSection slide="right" image={infoImage2} title={info2}/>
                    </div>
                    :
                    <div></div>
                }
            </div>
        )
    }
}

const { number, func, string } = PropTypes
AppPictures.propTypes = {
    appPicturesTop: number.isRequired,
    image: string,
    setAppPicturesTop: func.isRequired,
    setAppPicturesBottom: func.isRequired,
    appPicRef: func.isRequired
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