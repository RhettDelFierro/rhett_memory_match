var React = require("react");
var ReactRouter = require("react-router");
var Link = ReactRouter.Link;
require("../../css/styles.css");

function NavigationBar(props) {
    return (
        <header className="header">
            <div className="child"></div>
            <ul className="child">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/memory_match">Memory Match</Link></li>
                <li><Link to="/note_memory">Perfect Pitch</Link></li>
                <li><Link to="/scoreboard">High Scores</Link></li>
            </ul>
        </header>
    )
}

module.exports = NavigationBar;