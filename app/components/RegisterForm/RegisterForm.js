import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form/immutable'
import { error } from './styles.css'
import { connect } from 'react-redux'
import * as userActions from 'redux/modules/users'
import { push } from 'react-router-redux'
import validate from './validate'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} placeholder={label}/>
            {touched && error && <span>{error}</span>}
        </div>
    </div>
)

let RegisterForm = (props) => {
    //could also user handleSubmit(() => register)
    const { handleSubmit, pristine, reset, submitting, register } = props
    return (
        <form onSubmit={handleSubmit(register.bind(this))}>
            <Field name="email" type="email" component={renderField} label="Email"/>
            <Field name="username" type="text" component={renderField} label="Username"/>
            <Field name="password" type="password" component={renderField} label="Password"/>
            <Field name="confirmPassword" type="password" component={renderField} label="ConfirmPassword"/>
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                {' '}
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

RegisterForm = reduxForm({
    form: 'register',
    validate
})(RegisterForm)

RegisterForm = connect(
    null,
    userActions
)(RegisterForm)

export default RegisterForm