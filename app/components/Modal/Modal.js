import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import {modalHeader, modalBody, pointer, darkBtn,
        registerForm, loginForm } from './styles.css'
import { Map } from 'immutable'
import { LoginForm, RegisterForm } from 'components'

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
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 100000
    }
}

export default function Modal(props) {

    return (
        <span className={darkBtn} onClick={props.openModal}>
      {'Login or Signup!'}
            <ReactModal style={modalStyles} isOpen={props.isOpen} onRequestClose={props.closeModal}>
                <div className={modalHeader}>
                    <span>{'Login or Signup below!'}</span>
                    <span onClick={props.closeModal} className={pointer}>{'X'}</span>
                </div>
                <div className={modalBody}>
                    <div className={loginForm}>
                        <LoginForm />
                    </div>
                    <div className={registerForm}>
                        <RegisterForm />
                    </div>
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