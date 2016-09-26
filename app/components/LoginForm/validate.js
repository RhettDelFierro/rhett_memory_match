const validate = values => {
    // IMPORTANT: values is an Immutable.Map here!
    const errors = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (values.email.length > 40) {
        errors.email = 'Must be 40 characters or less'
    }

    return errors
}

export default validate