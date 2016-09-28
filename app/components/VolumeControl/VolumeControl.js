import React, { PropTypes, Component } from 'react'
import { volumeContainer, targetNote, noiseVolume, maskingNotes } from './styles.css'

class VolumeControl extends Component {
    constructor() {
        super()
        this.handleUpdate = this.handleUpdate.bind(this)
        this.changeVolume = this.changeVolume.bind(this)
        //render the range inputs with values from the redux store on load.
        this.state = {
            targetNoteVolume: "4.5",
            noiseVolume: "4.5",
            maskingNotesVolume: "4.5"
        }
    }

    componentDidMount() {
        this.setState({
            targetNoteVolume: this.props.targetNoteVolume,
            noiseVolume: this.props.noiseVolume,
            maskingNotesVolume: this.props.maskingNotesVolume
        })
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            targetNoteVolume: newProps.targetNoteVolume,
            noiseVolume: newProps.noiseVolume,
            maskingNotesVolume: newProps.maskingNotesVolume
        })
    }

    //set volume in Redux store
    handleUpdate() {
        this.props.setVolume({
            targetNoteVolume: this.state.targetNoteVolume,
            noiseVolume: this.state.noiseVolume,
            maskingNotesVolume: this.state.maskingNotesVolume
        })
    }

    changeVolume() {
        this.setState({
            targetNoteVolume: this.targetNoteNode.value,
            noiseVolume: this.noiseVolumeNode.value,
            maskingNotesVolume: this.maskingNotesNode.value
        })
    }

    render() {
        return (
            <div className={volumeContainer}>
                <input className={targetNote} ref={ref => this.targetNoteNode = ref} type="range" min="0" max="9"
                       step="0.01" value={this.state.targetNoteVolume} disabled={this.props.onCheck}
                       onMouseUp={this.handleUpdate} onTouchEnd={this.handleUpdate} onChange={this.changeVolume}/>

                <input className={noiseVolume} ref={ref => this.noiseVolumeNode = ref} type="range" min="0" max="9"
                       step="0.01" value={this.state.noiseVolume} disabled={this.props.onCheck}
                       onMouseUp={this.handleUpdate} onTouchEnd={this.handleUpdate} onChange={this.changeVolume}/>

                <input className={maskingNotes} ref={ref => this.maskingNotesNode = ref} type="range" min="0" max="9"
                       step="0.01" value={this.state.maskingNotesVolume} disabled={this.props.onCheck}
                       onMouseUp={this.handleUpdate} onTouchEnd={this.handleUpdate} onChange={this.changeVolume}/>
            </div>
        )
    }
}

const { func, bool, string } = PropTypes
VolumeControl.proptTypes = {
    onUpdate: func.isRequired,
    onCheck: bool.isRequired,
    targetNotVolume: string.isRequired,
    noiseVolume: string.isRequired,
    maskingNotesVolume: string.isRequired
}

export default VolumeControl