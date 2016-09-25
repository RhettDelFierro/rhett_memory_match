import React, { Component,PropTypes } from "react"
import { Field, reduxForm } from 'redux-form/immutable'
import { error } from './styles.css'
import { connect } from 'react-redux'
import * as userActions from 'redux/modules/users'
import validate from './validate'
import { spotifyLogin } from 'redux/modules/songs'

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

    const { handleSubmit, pristine, reset, submitting, login, spotifyLogin } = props
    return (
        <form onSubmit={handleSubmit(login.bind(this))}>
            <Field name="email" type="email" component={renderField} label="Email"/>
            <Field name="password" type="password" component={renderField} label="Password"/>
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                {' '}
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                {' '}
                <button onClick={spotifyLogin}>Login With Spotify</button>
            </div>
        </form>
    )
}

LoginForm = reduxForm({
    form: 'login',
    validate
})(LoginForm)

LoginForm = connect(
    null,
    {...userActions, spotifyLogin}
)(LoginForm)

export default LoginForm