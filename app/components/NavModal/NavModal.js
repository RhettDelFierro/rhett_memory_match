import React, { PropTypes } from 'react'
import { default as ReactModal } from 'react-modal'
import { pointer, darkBtn, hamburgerContainer, hamburger, bgModalContainer, clearModal } from './styles.css'
import { page, odd, even, content, cover, cover_back, pageContainer } from './modalStyles.css'
import { Map } from 'immutable'
import { Link } from 'react-router'
import { NavPageContainer } from 'containers'

export default function NavModal({ openNavModal, closeNavModal, isNavOpen }) {

    function ModalClose(props) {

        return closeNavModal()
    }

    return (
        <div className={hamburgerContainer} onClick={openNavModal}>
            <div className={hamburger}></div>
            <ReactModal overlayClassName={bgModalContainer} className={pageContainer} isOpen={isNavOpen} onRequestClose={closeNavModal}>
                <Book />
            </ReactModal>
        </div>
    )
}

function Book(props) {
    //left page (rotateY(-90deg) and right page rotateY(90deg).
    //perspective on parentcontainer.

    //const odd = `${page} odd turn`
    //const even = `${page} even turn`

    return (
            <div className={pageContainer}>
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
        <div className={oddClass} id={content}>
            <NavPageContainer />
        </div>
    )
}

const { func, bool } = PropTypes
NavModal.propTypes = {
    closeNavModal: func.isRequired,
    isNavOpen: bool.isRequired,
    openNavModal: func.isRequired
}