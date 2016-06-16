var React = require("react");
var NavigationBar = require("../components/NavigationBar");
var PropTypes = React.PropTypes;

var NavigationBarContainer = React.createClass({
    propTypes: {
        isLoggedIn: PropTypes.bool.isRequired,
        onUpdateLogin: PropTypes.func.isRequired,
        user: PropTypes.string
    },
    render: function () {
        return (
            <NavigationBar isLoggedIn={this.props.isLoggedIn}
                           user={this.props.user}
                           onUpdateLogin={this.props.onUpdateLogin}/>
        )
    }
});

module.exports = NavigationBarContainer;