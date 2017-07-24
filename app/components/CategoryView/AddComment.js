import React from 'react';
import { Link } from 'react-router';
import { connect, dispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

var AddComment = props => {
  console.log("AddComment props: ", props)
    const { handleSubmit } = props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="title" component="input" type="text"/>
        <Field name="description" component="input" type="text"/>
        <button type="submit"> Add </button>
      </form>
    )
}
AddComment = reduxForm({
  form: 'addCategory'
})(AddComment)
export default AddComment;
