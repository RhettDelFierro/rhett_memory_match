import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { container, targetNote, noiseVolume, maskingNotes } from './styles.css'

class VolumeControl extends Component {
    constructor() {
        super()
        this.state = {
            targetNote: this.props.targetNoteVolume,
            noise: this.props.noiseVolume,
            maskingNotes: this.props.maskingNotesVolume

        }
    }
    
    handleUpdate() {
        this.props.setVolume({
            targetNoteVolume: this.targetNoteNode.value,
            noiseVolume: this.noiseVolumeNode.value,
            maskingNotesVolume: this.maskingNotesNode.value
        })
    }

    render() {
        //set volume in redux store
        //when the component mounts we want to render the volume again with the right position.

        return (
            <div>
                <input className={targetNote} ref={ref => this.targetNoteNode = ref} type="range" min="0" max="9"
                       step="0.01" value={this.props.targetNote} disabled={this.props.onCheck}
                       onMouseUp={this.handleUpdate} onTouchEnd={this.handleUpdate}/>

                <input className={noiseVolume} ref={ref => this.noiseVolumeNode = ref} type="range" min="0" max="9"
                       step="0.01" value={this.props.noise} disabled={this.props.onCheck}
                       onMouseUp={this.handleUpdate} onTouchEnd={this.handleUpdate}/>

                <input className={maskingNotes} ref={ref => this.maskingNotesNode = ref} type="range" min="0" max="9"
                       step="0.01" value={this.props.maskingNotes} disabled={this.props.onCheck}
                       onMouseUp={this.handleUpdate} onTouchEnd={this.handleUpdate}/>
            </div>
        )
    }
}

//function Volume(props) {
//    return <input type="range" min="0" max="9" step="0.01" disabled={this.props.onCheck} onChange={this.props.handleUpdate}/>
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