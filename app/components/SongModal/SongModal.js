import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import { modalHeader, modalBody, pointer, playBtn } from './styles.css'
import { Map } from 'immutable'
import { SpotifyWidgetContainer } from 'containers'

const modalStyles = {
    content: {
        width: 600,
        margin: '0px auto',
        height: 400,
        borderRadius: 5,
        background: '#F8FBFD',
        padding: 0
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
}

export default function SongModal(props) {
    //<span className={playBtn} onClick={() => props.onPlayTrack()}>Play</span>
    const spanClass = props.trackSelected
    return (
        <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeSongModal}>
            <div className={modalHeader}>
                <span>{'Play your song!'}</span>
                <span onClick={props.closeSongModal} className={pointer}>{'X'}</span>
            </div>
            <div className={modalBody}>
                <div>
                    {'Web Audio Graphics Here'}
                </div>
                <div>
                    <SpotifyWidgetContainer />
                </div>
            </div>
        </ReactModal>
    )
}

const { func, bool } = PropTypes
SongModal.propTypes = {
    openSongModal: func.isRequired,
    closeSongModal: func.isRequired,
    isOpen: bool.isRequired
}