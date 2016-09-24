import React, { PropTypes, Component} from "react"
import { Link } from "react-router"
import { HomeBackgroundContainer, ParallaxContentContainer, AppInfoContainer,HeaderContainer } from 'containers'
import { Parallax, Header } from 'components'
import { homeContainer, header, background,example, example2, examplea, content, showImages } from './styles.css'


//remember to use refs you must use a container component, it will not take a functional component.
function Home({ windowPositionY }) {
        return (
            <div className={homeContainer}>
                <Header />
                <HomeBackgroundContainer windowPositionY={windowPositionY}/>
                <AppInfoContainer />
                <Parallax />
                <div className={content}>
                    <div className={examplea}>Blah haaha!</div>
                    <h1>blah</h1>
                    <div className={example2}>Blah haha!</div>
                </div>
                <div className={content}>
                    <div className={examplea}>Blah haaha!</div>
                    <h1>blah</h1>
                    <div className={example2}>Blah haha!</div>
                </div>
            </div>
        )
}

export default Home