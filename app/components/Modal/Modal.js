import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import {
    newDuckTop, pointer, newDuckInputContainer,
    newDuckInput, submitDuckBtn, darkBtn } from './styles.css'
import { Map } from 'immutable'
import { LoginForm, RegisterForm } from 'components'

const modalStyles = {
    content: {
        width: 350,
        margin: '0px auto',
        height: 220,
        borderRadius: 5,
        background: '#EBEBEB',
        padding: 0
    }
}

export default function Modal (props) {

    return (
        <span className={darkBtn} onClick={props.openModal}>
      {'Login or Signup!'}
            <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
                <div className={newDuckTop}>
                    <span>{'Login or Signup below!'}</span>
                    <span onClick={props.closeModal} className={pointer}>{'X'}</span>
                </div>
                <div className={newDuckInputContainer}>

                </div>
            </ReactModal>
    </span>
    )
}

const { func, bool } = PropTypes
Modal.propTypes = {
    closeModal: func.isRequired,
    isOpen: bool.isRequired,
    openModal: func.isRequired
}