import React, { PropTypes } from 'react'

export default function VolumeControl(props) {
    return <input type="range" min="0" max="5" step="0.01" onChange={props.onUpdate} />
}

VolumeControl.proptTypes = {
    onUpdate: PropTypes.func.isRequired
}