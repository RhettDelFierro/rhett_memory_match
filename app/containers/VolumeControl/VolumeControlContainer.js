import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { VolumeControl } from 'components'
import * as volumeActionCreators from 'redux/modules/volume'
import * as trainingActionCreators from 'redux/modules/training'

class VolumeControlContainer extends Component {
    constructor() {
        super()
        this.handleUpdate = this.handleUpdate.bind(this)
        this.state = {
            targetNote: 4.5,
            noise: 4.5,
            maskingNotes: 4.5
        }
    }

    handleUpdate(event) {

    }

    componentDidMount() {
        this.volumeNode.addEventListener('mouseup touchend', this.handleUpdate)

        //don't forget to also get the values from the redux Store. This is where refs can come into play.
    }

    componentWillUnmount() {
        this.volumeNode.removeEventListener('mouseup touchend', this.handleUpdate)
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
        //<VolumeControl onUpdate={(event) => this.handleUpdateTargetNoteVolume(event)}/>
        //<VolumeControl onUpdate={(event) => this.handleUpdateNoiseVolume(event)}/>
        //<VolumeControl onUpdate={(event) => this.handleUpdateMaskingNotesVolume(event)}/>
        return (
                <VolumeControl volumeRef={ref = this.volumeNode = ref}/>
        )
    }
}

function mapStateToProps({volume, training}) {
    return {
        targetNoteVolume: volume.get('targetNoteVolume'),
        noiseVolume: volume.get('noiseVolume'),
        maskingNotesVolume: volume.get('maskingNotesVolume'),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(volumeActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeControlContainer)