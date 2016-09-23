import React, { PropTypes, Component } from 'react'
import { default as ReactModal } from 'react-modal'
import { pointer, darkBtn, hamburgerContainer, hamburger, bgModalContainer, clearModal } from './styles.css'
import { page, odd, even, content, cover, cover_back, pageContainer,closeContent, closeBack, closeCover } from './modalStyles.css'
import { Map } from 'immutable'
import { Link } from 'react-router'
import { NavPageContainer } from 'containers'

export default function NavModal({ openNavModal, closeNavModal, isNavOpen }) {

    //const bgModalToggle = isNavOpen ? `${bgModalContainer}` : `${closeBG}`
    //const pageToggle = isNavOpen ? `${pageContainer}` : `${closePage}`
    return (
        <div className={hamburgerContainer} onClick={openNavModal}>
            <div className={hamburger}></div>
            <ReactModal overlayClassName={bgModalContainer} className={pageContainer} isOpen={isNavOpen}
                        onRequestClose={closeNavModal}
                        closeTimeoutMS={5000}
                        shouldCloseOnOverlayClick={false}>
                <Odd isNavOpen={isNavOpen}/>
                <Even isNavOpen={isNavOpen}/>
                <Content isNavOpen={isNavOpen}/>
            </ReactModal>
        </div>
    )
}


const { func, bool } = PropTypes
NavModal.propTypes = {
    closeNavModal: func.isRequired,
    isNavOpen: bool.isRequired,
    openNavModal: func.isRequired
}

function Odd({ isNavOpen }) {
    const oddClass = isNavOpen ? `${page} ${odd}` : `${closeCover}`
    return (
        <div className={oddClass} id={cover}></div>
    )
}

function Even({ isNavOpen }) {
    const evenClass = isNavOpen ? `${page} ${even}` : `${closeBack}`
    return (
        <div className={evenClass} id={cover_back}></div>
    )
}

function Content({ isNavOpen }) {
    const oddClass = isNavOpen ? `${page} ${odd}` : `${closeContent}`
    return (
        <div className={oddClass} id={content}>
            <NavPageContainer />
        </div>
    )
}