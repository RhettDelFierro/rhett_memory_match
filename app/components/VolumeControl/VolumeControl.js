import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { container } from './styles.css'

function VolumeControl(props) {
    return <input type="range" min="0" max="9" step="0.01" disabled={props.onCheck} onChange={props.onUpdate} />
}

VolumeControl.proptTypes = {
    onUpdate: PropTypes.func.isRequired,
    onCheck: PropTypes.bool.isRequired
}

function mapStateToProps({training}) {
    return {
        onCheck: training.get('onCheck')
    }
}

export default connect(mapStateToProps)(VolumeControl)