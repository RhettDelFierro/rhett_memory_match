import React from "react"
import LoginForm from "../components/LoginForm"
import { loginUser } from "../utils/userFunctions"

const LoginFormContainer = React.createClass({
    //don't forget to go to the logged in route.
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState () {
        return {
            isLoggedIn: false,
            user: "",
            password: "",
            token: ""
        };
    },
    //tie state to inputs.
    handleUpdateUser (e) {
        this.setState({
            user: e.target.value
        })
    },
    handleUpdatePassword (e) {
        this.setState({
            password: e.target.value
        })
    },

    handleSubmitUser (e) {
        e.preventDefault();
        this.getToken();
    },

    componentWillReceiveProps ({isLoggedIn, user}) {
        this.setState({
            isLoggedIn,
            user
        })
    },
    handleRegisterLogin (user, password) {
        this.setState({
            user,
            password
        });
        this.getToken()
    },

    //called on navbar login.
    async getToken () {
        const data = await loginUser({
            user: this.state.user,
            password: this.state.password
        });

        const date = new Date();
        date.setMinutes(15);
        document.cookie = `expires=${date}`;
        document.cookie = `token=${data.token}`;
        this.props.onUpdateLogin(true, data.user.username);

    },
    handleLogout () {
        this.setState({
            isLoggedIn: false,
            user: "",
            password: "",
            login: "",
            token: ""
        });
        document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "expires=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        this.props.onUpdateLogin(false, "");
    },
    render () {
        return (
            <LoginForm isLoggedIn={this.props.isLoggedIn}
                       user={this.state.user}
                       onUpdateLogin={this.props.onUpdateLogin}
                       onSubmitUser={this.handleSubmitUser}
                       onUpdateUser={this.handleUpdateUser}
                       onUpdatePassword={this.handleUpdatePassword}
                       password={this.state.password}
                       onLogout={this.handleLogout}/>
        )
    }
});


export default LoginFormContainer;