import React from "react"
import { Link } from "react-router"
import { container } from './styles.css'


function Home() {
    console.log("are we getting this?")
    return (
        <div className={container}>
            <Link to="/note_memory">
                <button type="button" className="btn btn-lg btn-primary">Note Memory</button>
            </Link>
        </div>
    )

}

export default Home