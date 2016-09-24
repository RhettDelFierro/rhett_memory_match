import React, { PropTypes, Component } from 'react'
import { default as ReactModal } from 'react-modal'
import { pointer, darkBtn, hamburgerContainer, hamburger, bgModalContainer, clearModal, closeBG } from './styles.css'
import { page, odd, even, content, cover, cover_back, pageContainer,closeContent, closeBack, closeCover, pageClose } from './modalStyles.css'
import { Map } from 'immutable'
import { Link } from 'react-router'
import { NavPageContainer } from 'containers'

export default function NavModal({ openNavModal, closeNavModal, isNavOpen }) {

    const bgModalToggle = isNavOpen ? `${bgModalContainer}` : `${bgModalContainer} ${closeBG}`
    const pageToggle = isNavOpen ? `${pageContainer}` : `${pageContainer} ${pageClose}`
    return (
        <div className={hamburgerContainer} onClick={() => setTimeout(openNavModal,500)}>
            <div className={hamburger}></div>
            <ReactModal overlayClassName={bgModalToggle} className={pageToggle} isOpen={isNavOpen}
                        onRequestClose={closeNavModal}
                        closeTimeoutMS={3000}
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
    const oddClass = isNavOpen ? `${page} ${odd}` : `${page} ${odd} ${closeCover}`
    return (
        <div className={oddClass} id={cover}></div>
    )
}

function Even({ isNavOpen }) {
    const evenClass = isNavOpen ? `${page} ${even}` : `${page} ${even} ${closeBack}`
    return (
        <div className={evenClass} id={cover_back}></div>
    )
}

function Content({ isNavOpen }) {
    const oddClass = isNavOpen ? `${page} ${odd}` : `${page} ${odd} ${closeContent}`
    return (
        <div className={oddClass} id={content}>
            <NavPageContainer />
        </div>
    )
}