import React from "react"
import { Link } from "react-router"
import { HomeBackgroundContainer, HomeImagesContainer } from 'containers'
import { container, header, background,example, example2, examplea, content } from './styles.css'
import { Parallax, Background } from 'react-parallax'


//remember to use refs you must use a container component, it will not take a functional component.
function Home() {
    return (
        <div className={container}>
            <div className={header}></div>
            <HomeBackgroundContainer />
            <div className={content}>
                <h1>blah</h1>
                <div className={examplea}>Blah haaha!</div>
                <h1>blah</h1>
                <div className={example2}>Blah haha!</div>
            </div>
            <HomeImagesContainer />
        </div>
    )

}

export default Home