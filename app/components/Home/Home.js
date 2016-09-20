import React from "react"
import { Link } from "react-router"
import { HomeBackgroundContainer, ParallaxContentContainer } from 'containers'
import { Header } from 'components'
import { homeContainer, header, background,example, example2, examplea, content, showImages } from './styles.css'
import { Parallax, Background } from 'react-parallax'


//remember to use refs you must use a container component, it will not take a functional component.
function Home({windowPositionY}) {
    return (
        <div className={homeContainer}>
            <Header />
            <HomeBackgroundContainer windowPositionY={windowPositionY}/>
            <ParallaxContentContainer windowPositionY={windowPositionY}/>
            <div className={content}>
                <h1>blah</h1>
                <div className={examplea}>Blah haaha!</div>
                <h1>blah</h1>
                <div className={example2}>Blah haha!</div>
            </div>
            <div className={showImages}></div>
        </div>
    )

}

export default Home