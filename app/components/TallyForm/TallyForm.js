import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { List, OrderedMap } from 'immutable'
import { Field, FieldArray, reduxForm } from 'redux-form/immutable'
import * as userActionCreators from 'redux/modules/users'
import * as songActionCreators from 'redux/modules/songs'
import { error, container, formContainer, noteNames, spotify, select } from './styles.css'

//define stateless component to render input and errors:
const renderField = ({ input, label, type, id}) => (
    <div>
        <input {...input} type={type} placeholder={id}/>{' '}<label>{label}</label>
    </div>
)

const renderNotes = ({ fields, notesCount, meta: { error } }) => (
    <ul>
        {notesCount.entrySeq().map(([note, count]) => {
            const labelString = `${note} - missed ${count} time(s)`
            return (
                <li className={noteNames} key={`notesMissed.${note}`}>
                    <Field name={`notesMissed.${note}`} id={`notesMissed.${note}`} component={renderField}
                           type="checkbox" label={labelString}/>
                </li>
            )
        })}
    </ul>
)

let TallyForm = (props) => {

    const { handleSubmit, pristine, reset, submitting, notesMissed, getSongs, spotifyAuthed, spotifyLogin } = props

    return (
        <form className={container} onSubmit={handleSubmit(getSongs.bind(this))}>
            <p>Select from the keys below and discover which songs use them!</p>
            <div className={formContainer}>
                <FieldArray name="notesMissed" component={renderNotes} notesCount={notesMissed}/>
            </div>
            <div className={select}>
                {spotifyAuthed === true
                    ? <button type="submit" disabled={submitting}>Find Some Music!</button>
                    : <button type="button" className={spotify} onClick={spotifyLogin}>Sign In Spotify</button>}
                {' '}
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

function mapStateToProps({scores,songs,users}) {
    return {
        notesMissed: scores.get('notesMissed'),
        notesSelected: songs.get('notesSelected'),
        fetchingSongs: songs.get('fetchingSongs'),
        spotifyAuthed: users.get('spotifyAuthed')
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...userActionCreators, ...songActionCreators}, dispatch)
}

TallyForm.propTypes = {
    notesMissed: PropTypes.instanceOf(OrderedMap).isRequired,
    spotifyAuthed: PropTypes.bool.isRequired,
    spotifyLogin: PropTypes.func.isRequired
}

TallyForm = reduxForm({
    form: 'notes'
})(TallyForm)

export default connect(mapStateToProps, mapDispatchToProps)(TallyForm)