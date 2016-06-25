import React, { Component } from "react"
import RegisterForm from "../components/RegisterForm"
import { verifyName, registerUser, loginPassword } from "../utils/userFunctions"


class RegisterFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            user: "",
            email: "",
            password: "",
            userInfo: {},
            duplicate: true,
            helpBlock: "hidden"
        }
    }

    componentWillUnmount() {
        this.setState({
            user: "",
            email: "",
            password: "",
            userInfo: [],
            duplicate: true,
            helpBlock: "hidden"
        })
    }

    handleUpdateUser(e) {
        this.setState({
            user: e.target.value
        });
        console.log(this.state.user);
        if (this.state.user.length >= 8) {
            this.ajaxValidUserName();
            this.setState({helpBlock: "show"})
        } else {
            this.setState({helpBlock: "hidden"})
        }
    }

    async ajaxValidUserName() {
        const userData = await verifyName(this.state.user);
        this.setState({
            duplicate: userData.taken
        });

    }

    handleUpdateEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleUpdatePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    async handleSubmitUser(e) {
        e.preventDefault();
        //in case for a backspace, but this should be done after the push to a new route:
        this.setState({
            user: "",
            email: "",
            password: "",
            userInfo: {}
        });
        //on fail stay on page and display error messages. Also re-set the state to have the info.
        const userData = await registerUser({
            user: this.state.user,
            email: this.state.email,
            password: this.state.password
        });
        this.getUser(userData.username);

    }

    async getUser(user) {
        const data = await loginPassword(user);

        const date = new Date();
        date.setMinutes(15);
        document.cookie = `expires=${date}`;
        document.cookie = `token=${data.token}`;
        this.props.onUpdateLogin(true, data.user.username);

    }

    render() {
        return (
            <RegisterForm onUpdateUser={(event) => this.handleUpdateUser(event)}
                          onUpdateEmail={(event) => this.handleUpdateEmail(event)}
                          onUpdatePassword={(event) => this.handleUpdatePassword(event)}
                          onSubmitUser={(event) => this.handleSubmitUser(event)}
                          user={this.state.user}
                          duplicate={this.state.duplicate}
                          helpBlock={this.state.helpBlock}/>
        )
    }
}

RegisterFormContainer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default RegisterFormContainer