import React, { PropTypes } from "react"
import NavigationBar from "../components/NavigationBar"

const NavigationBarContainer = React.createClass({
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

export default NavigationBarContainer;