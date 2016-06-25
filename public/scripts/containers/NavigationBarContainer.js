import React, { PropTypes, Component } from "react"
import NavigationBar from "../components/NavigationBar"

class NavigationBarContainer extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <NavigationBar isLoggedIn={this.props.isLoggedIn}
                           user={this.props.user}
                           onUpdateLogin={this.props.onUpdateLogin}/>
        )
    }
}

NavigationBarContainer.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    onUpdateLogin: PropTypes.func.isRequired,
    user: PropTypes.string
};

export default NavigationBarContainer;