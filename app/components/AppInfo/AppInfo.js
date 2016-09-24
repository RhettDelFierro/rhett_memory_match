import React, { PropTypes, Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as scrollActionCreators from 'redux/modules/scroll'
import { Map, OrderedMap, List } from 'immutable'
import { Breaker } from 'components'
import { appInfoContainer, wholeInfoContainer, defAP } from './styles.css'

class AppInfo extends Component {
    constructor() {
        super()
    }

    render() {
        const titleBreaker = 'Train Your Ears'
        const titleBreakerImage = require('assets/images/breaker-musicnote.png')

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
                      </div>
                    :
                    <div></div>
                }
            </div>
        )
    }
}

const { number, func } = PropTypes
AppInfo.propTypes = {
    homeImagesTop: number.isRequired,
    setHomeImagesTop: func.isRequired,
    setHomeImagesBottom: func.isRequired,
    imageRef: func.isRequired
}

function mapStateToProps({ scroll }) {
    return {
        homeImagesTop: scroll.get('homeImagesTop'),
        homeImagesBotton: scroll.get('homeImagesBottom')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(scrollActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppInfo)