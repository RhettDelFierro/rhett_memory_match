import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { container } from './styles.css'

class VolumeControl extends Component {
    constructor() {
        super()
    }

    render() {

    }
}

//function VolumeControl(props) {
//    return <input type="range" min="0" max="9" step="0.01" disabled={props.onCheck} onChange={props.onUpdate} />
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