import React, { PropTypes, Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'
import { Breaker, InfoSection } from 'components'
import { appInfoContainer, wholeInfoContainer, defAP } from './styles.css'

class AppInfo extends Component {
    constructor() {
        super()
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const titleBreaker = 'Train Your Ears'
        const titleBreakerImage = require('assets/images/breaker-musicnote.png')

        //mention the study results too.
        const infoDescription = 'Train Your Ears is an app based on the research done by the University of Chicago regarding if the acquisition of Absolute Pitch is possible.'
        const infoImage = require('assets/images/Perfect_Pitch_training.png')

        const infoDescription2 = 'Discover the keys some of your favorite songs were composed in after your training! Be even more familiar with the songs you grew up with!'
        const infoImage2 = require('assets/images/getsongnotes.png')

        return (
            <div ref={this.props.imageRef} className={appInfoContainer}>
                {this.props.showComponent
                    ? <div>
                        <Breaker title={titleBreaker} image={titleBreakerImage}/>
                        <div className={defAP}>
                            <p>Per wiki: Absolute pitch (AP), widely referred to as perfect pitch,  is a rare auditory phenomenon characterized by the
                                ability of a person to identify or re-create a given musical note without the benefit of a reference tone.

                                Those with absolute pitch may train their relative pitch, but there are no reported cases of an adult obtaining
                                 absolute pitch ability through musical training; adults who possess relative pitch but do not already have absolute
                                pitch can learn "pseudo-absolute pitch" and become able to identify notes in a way that superficially resembles
                                absolute pitch.</p>
                        </div>
                        <div className={wholeInfoContainer}>
                            <InfoSection align="left" image={infoImage} description={infoDescription} />
                            <InfoSection align="right" image={infoImage2} description={infoDescription2}/>
                        </div>
                      </div>
                    :
                    <div ref={(node) => this.node1 = node}></div>
                }
            </div>
        )
    }
}

const { number, func } = PropTypes
AppInfo.propTypes = {
    windowPositionY: number.isRequired,
    bgTop: number.isRequired,
    homeImagesTop: number.isRequired,
    setHomeImagesTop: func.isRequired,
    setHomeImagesBottom: func.isRequired,
    imageRef: func.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        windowPositionY: scroll.get('windowPositionY'),
        bgTop: scroll.get('bgTop'),
        homeImagesTop: scroll.get('homeImagesTop'),
        homeImagesBotton: scroll.get('homeImagesBottom')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppInfo)