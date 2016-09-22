import React, { PropTypes } from 'react'
import { pointer, darkBtn, hamburgerContainer, hamburger, bgModalContainer } from './styles.css'
import { page, odd, even, content, cover, cover_back, closeDiv } from './modalStyles.css'
import { Map } from 'immutable'
import { Link } from 'react-router'

export default function NavModal({ openModal, closeModal, isOpen }) {

    return (
        <div className={hamburgerContainer} onClick={openModal}>
            <div className={hamburger}></div>
            <BackgroundModal isOpen={isOpen} close={closeModal}/>
        </div>
    )
}

//close is a function that will toggle isOpen. Use it to toggle the modal.
//maybe onclose will take display to none after animation.
function BackgroundModal(props) {
    return (
        props.isOpen ?
            <div className={bgModalContainer}>
                <BookModal {...props} />
            </div>
            : <div></div>
    )
}

function BookModal({ isOpen, close }) {
    //left page (rotateY(-90deg) and right page rotateY(90deg).
    //perspective on parentcontainer.

    //const odd = `${page} odd turn`
    //const even = `${page} even turn`

    return (
        isOpen ?
            <div className={closeDiv}>
                <Odd />
                <Even />
                <Odd />
                <Even />
                <Content />
            </div>
            : <div></div>
    )
}

function Odd(){
    const oddClass = `${page} ${odd}`
    return (
        <div className={oddClass} id={cover}></div>
    )
}

function Even(){
    const evenClass = `${page} ${even}`
    return (
        <div className={evenClass} id={cover_back}></div>
    )
}

function Content(){
    const oddClass = `${page} ${odd}`
    return (
        <div className={oddClass} id={content}></div>
    )
}

function RightPage(props){
    return (
        <div>
            <div className={front}></div>
            <div className={back}></div>
        </div>
    )
}

const { func, bool } = PropTypes
NavModal.propTypes = {
    closeModal: func.isRequired,
    isOpen: bool.isRequired,
    openModal: func.isRequired
}