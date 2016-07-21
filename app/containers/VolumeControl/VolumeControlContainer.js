import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { VolumeControl } from 'components'
import * as volumeActionCreators from 'redux/modules/volume'

class VolumeControlContainer extends Component {
    constructor() {
        super()
    }

    handleUpdateTargetNoteVolume(event) {
        this.props.targetNoteVolumeChange(event.target.value)
    }

    handleUpdateNoiseVolume(event) {
        this.props.noiseVolumeChange(event.target.value)
    }

    handleUpdateMaskingNotesVolume(event) {
        this.props.maskingNotesVolumeChange(event.target.value)
    }

    render() {
        return (
            <div>
                <VolumeControl onUpdate={(event) => this.handleUpdateTargetNoteVolume(event)}/>
                <VolumeControl onUpdate={(event) => this.handleUpdateNoiseVolume(event)}/>
                <VolumeControl onUpdate={(event) => this.handleUpdateMaskingNotesVolume(event)}/>
            </div>
        )
    }
}

function mapStateToProps({volume}) {
    return {
        targetNoteVolume: volume.get('targetNoteVolume'),
        noiseVolume: volume.get('noiseVolume'),
        maskingNotesVolume: volume.get('maskingNotesVolume')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(volumeActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeControlContainer)