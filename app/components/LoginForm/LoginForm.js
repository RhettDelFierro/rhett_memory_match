import React, { Component,PropTypes } from "react"
import { reduxForm } from 'redux-form'
import { error } from './styles.css'
import * as userActions from 'redux/modules/users'

class Login extends Component {

    async handleFormSubmit(formProps) {
        //console.log('handleFormSubmit is called', formProps)
        const loginUser = await this.props.login(formProps)
        //go back to where the user was before they visit the link (get it off the state)
        //get the username from register and send it as a query/route param also:
        //dispatch(push({pathname: `/${registerUser.route}`, query: {uid: registerUser.uid }}))
    }

    render() {
        const {fields: {email, password}, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="email" placeholder="Email" {...email}/>
                </fieldset>
                <fieldset className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="password" placeholder="Password" {...password}/>
                </fieldset>
                <button action="submit" type="submit">Submit</button>
            </form>
        );
    }
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
    form: 'login',
    fields: ['email', 'password']
}, null, userActions)(Login)

