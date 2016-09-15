import React from "react"
import { Link } from "react-router"
import { container, header, slider, engage } from './styles.css'


//remember to use refs you must use a container component, it will not take a functional component.
function Home() {

    return (
        <div className={container}>
            <div className={header}>
                <a className={engage} href=""/>
            </div>
        </div>
    )

}

export default Home