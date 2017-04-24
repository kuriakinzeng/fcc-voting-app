import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { createPoll, clearErrorAction } from '../actions/';

class PollNewForm extends Component {
  componentWillUnmount(){
    this.props.clearErrorAction();
  }

  submitForm(poll) {
    const pollWithUser = {...poll, user: this.props.user}
    console.log(pollWithUser);
    this.props.createPoll(pollWithUser);
  }

  renderError(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      )
    }
  }

  renderField(field){
    const { input, type, placeholder, meta: {touched, error}} = field;
    return (
      <div className="form-group">
        <input className="form-control" type={type} placeholder={placeholder} {...input} />
        { touched && error && <div className="error">{error}</div>}
      </div>
    )
  }

  renderTextarea(field){
    const { input, placeholder, meta: {touched, error}} = field;
    return (
      <div className="form-group">
        <textarea className="form-control" placeholder={placeholder} {...input} />
        { touched && error && <div className="error">{error}</div>}
      </div>
    )
  }

  render() {
    const { handleSubmit, submitting, pristine, reset } = this.props;
    return (
      <div>
        <h3>New Poll</h3>
        <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
          <Field name="name" type="text" component={this.renderField} placeholder="Question"/>
          <Field name="options" component={this.renderTextarea} placeholder="Option 1, Option 2, ..."/>
          {this.renderError()}
          <button className="btn btn-primary" disabled={submitting} type="submit">Submit</button>
          <button className="btn btn-link" disabled={pristine || submitting} type="button" onClick={reset}>Reset</button>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};
  if(!values.name)
    errors.name = 'Question is required';
  if(!values.options)
    errors.options = 'Options are required';  
  return errors;
}

const PollNew = reduxForm({
  form: 'pollNew',
  validate
})(PollNewForm);

const mapStateToProps = (state) => {
  return {errorMessage: state.polls.error, user: state.auth.user }
}

export default connect(mapStateToProps, {createPoll, clearErrorAction})(PollNew);