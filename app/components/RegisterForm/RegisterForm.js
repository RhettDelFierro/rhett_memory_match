import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { error } from './styles.css'
import * as userActions from 'redux/modules/users'
import { push } from 'react-router-redux'

class RegisterForm extends Component {
    async handleFormSubmit(formProps) {
        //console.log('handleFormSubmit is called', formProps)
        const registerUser = await this.props.register(formProps)
        console.log(registerUser)
        //go back to where the user was before they visit the link (get it off the state)
        //get the username from register and send it as a query/route param also:
        //dispatch(push({pathname: `/${registerUser.route}`, query: {uid: registerUser.uid }}))
    }

    render() {
        const {fields: {email, username, password, passwordConfirm}, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="email" placeholder="First Name" {...email}/>
                    <div className="error">{email.touched ? email.error : ''}</div>
                </fieldset>
                <fieldset className="form-group">
                    <label>username</label>
                    <input className="form-control" type="text" placeholder="First Name" {...username}/>
                    <div className="error">{username.touched ? username.error : ''}</div>
                </fieldset>
                <fieldset className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="password" placeholder="Last Name" {...password}/>
                    <div className="error">{password.touched ? password.error : ''}</div>
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password</label>
                    <input className="form-control" type="password" placeholder="Email" {...passwordConfirm}/>
                    <div className="error">{passwordConfirm.touched ? passwordConfirm.error : ''}</div>
                </fieldset>
                <button action="submit" type="submit">Submit</button>
            </form>
        );
    }
}

function validate(formProps) {
    const errors = {}

    if (!formProps.email || formProps.email.trim() === '') {
        errors.email = 'Please enter an email'
    }

    //if (!formProps.username || formProps.username.trim() === '') {
    //    errors.username = 'Please enter an username'
    //}
    //
    //if (!formProps.password || formProps.password.trim() === '') {
    //    errors.password = 'Please enter a password'
    //}
    //
    //if (!formProps.passwordConfirm || formProps.passwordConfirm.trim() === '') {
    //    errors.email = 'Please confirm your password'
    //}

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
    form: 'register',
    fields: ['email', 'username', 'password', 'passwordConfirm'],
    validate
}, null, userActions)(RegisterForm)


RegisterForm.propTypes = {
    register: PropTypes.func.isRequired
};