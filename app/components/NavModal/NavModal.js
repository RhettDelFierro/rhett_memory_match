import React, { PropTypes } from 'react'
import { pointer, darkBtn, hamburgerContainer, hamburger,
    navModal, modalBody, leftPage, rightPage } from './styles.css'
import { Map } from 'immutable'
import { Link } from 'react-router'

export default function NavModal({ openModal, closeModal, isOpen }) {

    return (
        <div className={hamburgerContainer} onClick={openModal}>
            <div className={hamburger}></div>
            <BookModal open={isOpen} close={closeModal}/>
        </div>
    )
}

//close is a function that will toggle isOpen. Use it to toggle the modal.
//maybe onclose will take display to none after animation.
function BookModal({ isOpen, close }){
    //left page (rotateY(-90deg) and right page rotateY(90deg).
    //perspective on parentcontainer.


    return (
        <div className={navModal}>
            <div className={modalBody}>
                <div className={leftPage}>
                </div>
                <div className={rightPage}>
                </div>
            </div>
        </div>
    )
}

const { func, bool } = PropTypes
NavModal.propTypes = {
    closeModal: func.isRequired,
    isOpen: bool.isRequired,
    openModal: func.isRequired
}