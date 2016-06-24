import React from "react"
import NavigationBarContainer from "./NavigationBarContainer"

const styles = {
    container: {
        height: "100%",
        padding: "0px"
    }
};

const MainContainer = React.createClass({
    getInitialState () {
        return {
            isLoggedIn: false,
            username: ""
        }
    },
    handleUpdateLogin (loggedIn, username) {
        this.setState({
            isLoggedIn: loggedIn, //!(this.state.isLoggedIn),
            username: username
        });
        console.log("are we getting these?", loggedIn, username)
    },
    render () {
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

export default MainContainer