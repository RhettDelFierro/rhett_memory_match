var React = require('react');
var NavigationBarContainer = require("./NavigationBarContainer");

var styles = {
    container: {
        height: "100%",
        padding: "0px"
    }
};

var MainContainer = React.createClass({
    getInitialState: function () {
        return {
            isLoggedIn: false,
            username: ""
        }
    },
    handleUpdateLogin: function (loggedIn, username) {
        this.setState({
            isLoggedIn: loggedIn, //!(this.state.isLoggedIn),
            username: username
        });
        console.log("are we getting these?", loggedIn, username)
    },
    render: function () {
        //<HomeContainer> is a child.
        return (
            <div className="container-fluid" style={styles.container}>
                <NavigationBarContainer onUpdateLogin={this.handleUpdateLogin}
                                        isLoggedIn={this.state.isLoggedIn}
                                        user={this.state.username}/>
                {this.props.children}
            </div>
        )
    }
});

module.exports = MainContainer;