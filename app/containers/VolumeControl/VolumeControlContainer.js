import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { VolumeControl } from 'components'
import * as volumeActionCreators from 'redux/modules/volume'
import * as trainingActionCreators from 'redux/modules/training'

class VolumeControlContainer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
                <VolumeControl {...this.props}/>
        )
    }
}

function mapStateToProps({volume, training}) {
    return {
        onCheck: training.get('onCheck'),
        targetNoteVolume: volume.get('targetNoteVolume'),
        noiseVolume: volume.get('noiseVolume'),
        maskingNotesVolume: volume.get('maskingNotesVolume')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(volumeActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeControlContainer)