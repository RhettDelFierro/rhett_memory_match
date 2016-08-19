import React, { Component,PropTypes } from "react"
import { reduxForm } from 'redux-form'
import { error } from './styles.css'
import * as userActions from 'redux/modules/users'

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
    fields: ['loginInfo', 'password']
}, userActions)(Login)

