import React, { Component } from "react"
import NavigationBarContainer from "./NavigationBarContainer"

const styles = {
    container: {
        height: "100%",
        padding: "0px"
    }
};

class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            username: ""
        }
    }

    handleUpdateLogin(loggedIn, username) {
        this.setState({
            isLoggedIn: loggedIn, //!(this.state.isLoggedIn),
            username: username
        });
    }

    render() {
        //<HomeContainer> is a child.
        return (
            <div className="container-fluid" style={styles.container}>
                <NavigationBarContainer onUpdateLogin={(loggedIn, username) => this.handleUpdateLogin(loggedIn, username)}
                                        isLoggedIn={this.state.isLoggedIn}
                                        user={this.state.username}/>
                {this.props.children}
            </div>
        )
    }
}

export default MainContainer