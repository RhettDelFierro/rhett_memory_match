import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, OrderedMap } from 'immutable'
import { Field, FieldArray, reduxForm } from 'redux-form/immutable'
import * as userActionCreators from 'redux/modules/users'
import * as songActionCreators from 'redux/modules/songs'
import { error } from './styles.css'

//define stateless component to render input and errors:
const renderField = ({ input, label, type, id}) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} type={type} placeholder={id}/>
        </div>
    </div>
)

const renderNotes = ({ fields, notesCount, meta: { error } }) => (
    <ul>
        {notesCount.entrySeq().map(([note, count]) => {
            const labelString = `${note} (missed ${count} times)`
            return (
                <li key={`notesMissed.${note}`}>
                    <Field name={`notesMissed.${note}`} id={`notesMissed.${note}`} component={renderField} type="checkbox" label={labelString}/>
                </li>
            )
        })}
    </ul>
)

let TallyForm = (props) => {

    const { handleSubmit, pristine, reset, submitting, notesMissed, getSongs } = props

    return (
        <form onSubmit={handleSubmit(getSongs.bind(this))}>

            <FieldArray name="notesMissed" component={renderNotes} notesCount={notesMissed}/>
            <div>
                <button type="submit" disabled={submitting}>Submit</button>
                {' '}
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

function mapStateToProps({scores,songs}) {
    return {
        notesMissed: scores.get('notesMissed'),
        notesSelected: songs.get('notesSelected'),
        fetchingSongs: songs.get('fetchingSongs')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...userActionCreators, ...songActionCreators}, dispatch)
}

TallyForm.propTypes = {
    notesMissed: PropTypes.instanceOf(OrderedMap).isRequired
}

TallyForm = reduxForm({
    form: 'notes'
})(TallyForm)

//TallyForm = connect(
//    mapStateToProps,
//    {...userActionCreators, ...songActionCreators}
//)(TallyForm)

export default connect(mapStateToProps,mapDispatchToProps)(TallyForm)