var React = require("react");
var RegisterForm = require("../components/RegisterForm");
var userFunctions = require("../utils/userFunctions");

var RegisterFormContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    //make the ajax calls from here.
    getInitialState: function () {
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
    componentWillUnmount: function(){
        this.setState({
            user: "",
            email: "",
            password:"",
            userInfo: [],
            duplicate: true,
            helpBlock: "hidden"
        })
    },
    handleUpdateUser: function (e) {
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
    ajaxValidUserName: function () {
        userFunctions.verifyName(this.state.user)
            .then(function (userdata) {
                this.setState({
                    duplicate: userdata.taken
                })
            }.bind(this));
    },
    handleUpdateEmail: function (e) {
        this.setState({
            email: e.target.value
        });
    },
    handleUpdatePassword: function (e) {
        this.setState({
            password: e.target.value
        });
    },
    handleSubmitUser: function (e) {
        e.preventDefault();
        //in case for a backspace, but this should be done after the push to a new route:
        this.setState({
            user: "",
            email: "",
            password: "",
            userInfo: {}
        });
        //on fail stay on page and display error messages. Also re-set the state to have the info.
        userFunctions.registerUser({
                user: this.state.user,
                email: this.state.email,
                password: this.state.password
            })
            .then(function (userdata) {
                this.getUser(userdata.username);
            }.bind(this));
    },
    getUser: function (user) {
        userFunctions.loginPassword(user)
            .then(function (data) {
                console.log("2nd data: ", data);
                var date = new Date();
                date.setMinutes(15);
                document.cookie = "expires=" + date;
                document.cookie = "token=" + data.token;
                this.props.onUpdateLogin(true, data.user.username);
            }.bind(this));
    },
    render: function () {
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

module.exports = RegisterFormContainer;