import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { container } from './styles.css'

class VolumeControl extends Component {
    constructor() {
        super()
    }

    render() {
        //set volume in redux store
        //when the component mounts we want to render the volume again with the right position.

        return (
            <div ref={this.props.volumeRef}>
                <input ref={ref => this.targetNoteNode = ref} type="range" min="0" max="9"
                       step="0.01" disabled={props.onCheck} onChange={props.onUpdate}/>

                <input ref={ref => this.noiseVolumeNode = ref} type="range" min="0" max="9" step="0.01"
                       disabled={props.onCheck} onChange={props.onUpdate}/>

                <input ref={ref => this.maskingNotesNode = ref} type="range" min="0" max="9" step="0.01"
                       disabled={props.onCheck} onChange={props.onUpdate}/>
            </div>
        )
    }
}

//function Volume(props) {
//    return <input type="range" min="0" max="9" step="0.01" disabled={props.onCheck} onChange={props.onUpdate}/>
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