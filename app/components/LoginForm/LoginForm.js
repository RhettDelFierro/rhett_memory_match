import React, { PropTypes } from "react"
import { reduxForm } from 'redux-form'
import { error } from './styles.css'
import * as userFunctions from 'redux/modules/users'
import { push } from 'react-router-redux'

function userForm({userValidation}) {
    return (
        <div>
            {userValidation === 'login'
                ? <Login />
                : <Signup />}
        </div>
    )
}

class Login extends Component {
    handleFormSubmit(formProps){

    }

    render() {
        const {fields: {loginInfo, password}, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit).bind(this)}>
                <div>
                    <label>Username or Email</label>
                    <input type="text" placeholder="First Name" {...loginInfo}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Email" {...password}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

class SignUp extends Component {
    async handleSubmit(formProps) {
        const register = await this.props.registerUser(formProps)
        //go back to where the user was before they visit the link (get it off the state)
        //get the username from register and send it as a query/route param also:
        dispatch(push({pathname: `/${register.route}`, query: {uid: register.uid }}))
    }

    render() {
        const {fields: {email, username, password, passwordConfirm}, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit).bind(this)}>
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="First Name" {...email}/>
                    <div className="error">{email.touched ? email.error : ''}</div>
                </div>
                <div>
                    <label>username</label>
                    <input type="text" placeholder="First Name" {...email}/>
                    <div className="error">{username.touched ? username.error : ''}</div>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder="Last Name" {...password}/>
                    <div className="error">{password.touched ? password.error : ''}</div>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Email" {...passwordConfirm}/>
                    <div className="error">{passwordConfirm.touched ? passwordConfirm.error : ''}</div>
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {}

    if (!formProps.email || formProps.email.trim() === '') {
        errors.email = 'Please enter an email'
    }

    if (!formProps.username || formProps.username.trim() === '') {
        errors.username = 'Please enter an username'
    }

    if (!formProps.password || formProps.password.trim() === '') {
        errors.password = 'Please enter a password'
    }

    if (!formProps.passwordConfirm || formProps.passwordConfirm.trim() === '') {
        errors.email = 'Please confirm your password'
    }

    if (formProps.passwordConfirm > formProps.password && formProps.password !== formProps.passwordConfirm) {
        errors.password = 'Passwords must match'
    }
    return errors
}

async function asyncValidate(values, dispatch) {
    return new Promise((resolve, reject) => {
        dispatch(validatePostFields(values))
            .then((response) => {
                let data = response.payload.data;
                let status = response.payload.status;
                //if there is an error
                if (status != 200 || data.user || data.token || data.uid) {
                    //let other comps know of error by updating redux` state
                    dispatch(validatePostFieldsFailure(response.payload));
                    reject(data); //this is for redux-form itself
                } else {
                    //let other comps know success by updating redux` state
                    dispatch(validatePostFieldsSuccess(response.payload));
                    resolve();//this is for redux-form itself
                }
            }); //dispatch
    }); //promise
};


export default reduxForm({
    form: 'login',
    fields: ['loginInfo', 'password']
})(Login)

export default reduxForm({
    form: 'signup',
    fields: ['email', 'user', 'password'],
    validate
}, null, userActions)(SignUp)