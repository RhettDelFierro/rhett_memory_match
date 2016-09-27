import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { container, targetNote, noiseVolume, maskingNotes } from './styles.css'

class VolumeControl extends Component {
    constructor() {
        super()
        this.state = {
            targetNote: 4.5,
            noiseVolume: 4.5,
            maskingNotes: 4.5
        }
    }

    render() {
        //set volume in redux store
        //when the component mounts we want to render the volume again with the right position.

        return (
            <div ref={this.props.volumeRef}>
                <input className={targetNote} ref={ref => this.targetNoteNode = ref} type="range" min="0" max="9"
                       step="0.01" disabled={this.props.onCheck} onChange={this.props.onUpdate}/>

                <input className={noiseVolume} ref={ref => this.noiseVolumeNode = ref} type="range" min="0" max="9"
                       step="0.01" disabled={this.props.onCheck} onChange={this.props.onUpdate}/>

                <input className={maskingNotes} ref={ref => this.maskingNotesNode = ref} type="range" min="0" max="9"
                       step="0.01" disabled={this.props.onCheck} onChange={this.props.onUpdate}/>
            </div>
        )
    }
}

//function Volume(props) {
//    return <input type="range" min="0" max="9" step="0.01" disabled={this.props.onCheck} onChange={this.props.onUpdate}/>
//}

const { func, bool } = PropTypes
VolumeControl.proptTypes = {
    onUpdate: func.isRequired,
    onCheck: bool.isRequired,
    volumeRef: func.isRequired
}

function mapStateToProps({training}) {
    return {
        onCheck: training.get('onCheck')
    }
}

export default connect(mapStateToProps)(VolumeControl)