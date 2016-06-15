var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;

var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: "url('public/images/crowd.jpg')",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
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

module.exports = Home;