import React from "react"
import RegisterForm from "../components/RegisterForm"
import { verifyName, registerUser, loginPassword } from "../utils/userFunctions"


const RegisterFormContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    //make the ajax calls from here.
    getInitialState () {
        //bet we get the values of the input texts and make an object out of it
        return ({
            //isLoggedIn maybe will pass into /teachers/:users to re-render "/"
            isLoggedIn: false,
            user: "",
            email: "",
            password: "",
            userInfo: {},
            duplicate: true,
            helpBlock: "hidden"
        })
    },
    componentWillUnmount (){
        this.setState({
            user: "",
            email: "",
            password: "",
            userInfo: [],
            duplicate: true,
            helpBlock: "hidden"
        })
    },
    handleUpdateUser (e) {
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
    },
    ajaxValidUserName () {
        verifyName(this.state.user)
            .then((userdata) => {
                this.setState({
                    duplicate: userdata.taken
                })
            });
    },
    handleUpdateEmail (e) {
        this.setState({
            email: e.target.value
        });
    },
    handleUpdatePassword (e) {
        this.setState({
            password: e.target.value
        });
    },
    handleSubmitUser (e) {
        e.preventDefault();
        //in case for a backspace, but this should be done after the push to a new route:
        this.setState({
            user: "",
            email: "",
            password: "",
            userInfo: {}
        });
        //on fail stay on page and display error messages. Also re-set the state to have the info.
        registerUser({
            user: this.state.user,
            email: this.state.email,
            password: this.state.password
        })
            .then((userdata) => {
                this.getUser(userdata.username);
            });
    },
    getUser (user) {
        loginPassword(user)
            .then((data) => {
                console.log("2nd data: ", data);
                const date = new Date();
                date.setMinutes(15);
                document.cookie = "expires=" + date;
                document.cookie = "token=" + data.token;
                this.props.onUpdateLogin(true, data.user.username);
            });
    },
    render () {
        return (
            <RegisterForm onUpdateUser={this.handleUpdateUser}
                          onUpdateEmail={this.handleUpdateEmail}
                          onUpdatePassword={this.handleUpdatePassword}
                          onSubmitUser={this.handleSubmitUser}
                          user={this.state.user}
                          duplicate={this.state.duplicate}
                          helpBlock={this.state.helpBlock}/>
        )
    }
});

export default RegisterFormContainer