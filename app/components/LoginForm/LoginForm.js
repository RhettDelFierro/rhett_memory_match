import React, { Component,PropTypes } from "react"
import { Field, reduxForm } from 'redux-form/immutable'
import { error } from './styles.css'
import { connect } from 'react-redux'
import * as userActions from 'redux/modules/users'
import validate from './validate'

//define stateless component to render input and errors:
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} placeholder={label}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

let LoginForm = (props) => {

    const { handleSubmit, pristine, reset, submitting, login } = props
    return (
        <form onSubmit={handleSubmit(login.bind(this))}>
            <Field name="email" type="email" component={renderField} label="Email"/>
            <Field name="password" type="password" component={renderField} label="Password"/>
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

LoginForm = reduxForm({
    form: 'login',  // a unique identifier for this form
    validate
})(LoginForm)

LoginForm = connect(
    null,
    userActions              // bind account loading action creator
)(LoginForm)

export default LoginForm



//class LoginForm extends Component {
//
//    async handleFormSubmit(formProps) {
//        //console.log('handleFormSubmit is called', formProps)
//        const loginUser = await this.props.login(formProps)
//        //go back to where the user was before they visit the link (get it off the state)
//        //get the username from register and send it as a query/route param also:
//        //dispatch(push({pathname: `/${registerUser.route}`, query: {uid: registerUser.uid }}))
//    }
//
//    render() {
//        const {fields: {email, password}, handleSubmit} = this.props;
//        return (
//            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
//                <fieldset className="form-group">
//                    <label>Email</label>
//                    <input className="form-control" type="email" placeholder="Email" {...email}/>
//                </fieldset>
//                <fieldset className="form-group">
//                    <label>Password</label>
//                    <input className="form-control" type="password" placeholder="Password" {...password}/>
//                </fieldset>
//                <button action="submit" type="submit">Submit</button>
//            </form>
//        );
//    }
//}
//
//
//
//export default reduxForm({
//    form: 'login',
//    fields: ['email', 'password']
//}, null, userActions)(LoginForm)
//
//LoginForm.propTypes = {
//    login: PropTypes.func.isRequired
//}