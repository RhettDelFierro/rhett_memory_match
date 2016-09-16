import React from "react"
import { Link } from "react-router"
import { container, header, background,example, example2, examplea } from './styles.css'
import { Parallax } from 'react-parallax'


//remember to use refs you must use a container component, it will not take a functional component.
function Home() {
    const img = require('../../assets/images/backgroundattempt2.jpg')
    return (
        <div className={container}>
            <Parallax className={background} bgHeight="5000px" bgImage={img} strength={200}>
                <div className={header}></div>
                <h1>blah</h1>
                <h1>blah</h1>
                <div className={example}>Blah haha!</div>
                <h1>blah</h1>
                <div className={examplea}>Blah haaha!</div>
                <h1>blah</h1>
                <div className={example2}>Blah haha!</div>
            </Parallax>
        </div>
    )

}

export default Home