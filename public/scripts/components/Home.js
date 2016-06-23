import React from "react"
import { Link } from "react-router"

const styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: "url('public/images/crowd.jpg')",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        marginTop: "-20px"
    },
    header: {
        fontSize: 45,
        color: '#fff',
        fontWeight: 100,
    }
};


function Home(props) {
    return (
        <div style={styles.container}>
            <Link to="/note_memory">
                <button type="button" className="btn btn-lg btn-primary">Note Memory</button>
            </Link>
        </div>
    )

}

export default Home