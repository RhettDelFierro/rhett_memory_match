import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import { pointer, darkBtn, hamburgerContainer, hamburger, bgModalContainer, clearModal } from './styles.css'
import { page, odd, even, content, cover, cover_back, pageContainer } from './modalStyles.css'
import { Map } from 'immutable'
import { Link } from 'react-router'

export default function NavModal({ openModal, closeModal, isOpen }) {

    return (
        <div className={hamburgerContainer} onClick={openModal}>
            <div className={hamburger}></div>
            <ReactModal overlayClassName={bgModalContainer} className={pageContainer} isOpen={isOpen} onRequestClose={closeModal}>
                <BookModal />
            </ReactModal>
        </div>
    )
}

//close is a function that will toggle isOpen. Use it to toggle the modal.
//maybe onclose will take display to none after animation.
function BackgroundModal(props) {
    const openModal = props.isOpen ? `${bgModalContainer}` : `${clearModal}`
    return (
        <div className={openModal} onClick={props.closeModal}>

        </div>
    )
}

function ModalClose(props) {

}

function BookModal(props) {
    //left page (rotateY(-90deg) and right page rotateY(90deg).
    //perspective on parentcontainer.

    //const odd = `${page} odd turn`
    //const even = `${page} even turn`

    return (
            <div className={pageContainer}>
                <Odd />
                <Even />
                <Odd />
                <Even />
                <Content />
            </div>
    )
}

function Odd() {
    const oddClass = `${page} ${odd}`
    return (
        <div className={oddClass} id={cover}></div>
    )
}

function Even() {
    const evenClass = `${page} ${even}`
    return (
        <div className={evenClass} id={cover_back}></div>
    )
}

function Content() {
    const oddClass = `${page} ${odd}`
    return (
        <div className={oddClass} id={content}></div>
    )
}

const { func, bool } = PropTypes
NavModal.propTypes = {
    closeModal: func.isRequired,
    isOpen: bool.isRequired,
    openModal: func.isRequired
}