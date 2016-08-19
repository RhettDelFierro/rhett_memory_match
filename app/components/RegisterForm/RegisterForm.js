import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { error } from './styles.css'
import * as userActions from 'redux/modules/users'
import { push } from 'react-router-redux'

class RegisterForm extends Component {
    async handleSubmit(formProps) {
        const registerUser = await this.props.register(formProps)

        //go back to where the user was before they visit the link (get it off the state)
        //get the username from register and send it as a query/route param also:
        //dispatch(push({pathname: `/${registerUser.route}`, query: {uid: registerUser.uid }}))
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
                    <input type="text" placeholder="First Name" {...username}/>
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

    //if (formProps.passwordConfirm > formProps.password && formProps.password !== formProps.passwordConfirm) {
    //    errors.password = 'Passwords must match'
    //}
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
}

export default reduxForm({
    form: 'signup',
    fields: ['email', 'username', 'password'],
    validate
}, null, userActions)(RegisterForm)


RegisterForm.propTypes = {
    onUpdateUser: PropTypes.func,
    onSubmitUser: PropTypes.func,
    user: PropTypes.string,
    onUpdateEmail: PropTypes.func,
    onUpdatePassword: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
    duplicate: PropTypes.bool.isRequired,
    helpBlock: PropTypes.string.isRequired
};

export default RegisterForm
