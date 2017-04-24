import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { updateVoters, clearErrorAction } from '../actions';

class Voting extends Component {
  componentWillUnmount(){
    this.props.clearErrorAction();
  }
  submitForm(voteObj) {
    const { authenticated, user, activePoll, updateVoters, hasCustom } = this.props;

    if (authenticated) {
      if(hasCustom)
        updateVoters({ ...voteObj, pollId: activePoll._id, user, optionId: undefined })
      else
        updateVoters({ ...voteObj, pollId: activePoll._id, user, customOption: undefined })
    } else
      updateVoters({ ...voteObj, pollId: activePoll._id });
  }

  renderError() {
    if (this.props.errorMessage) {
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

  renderSelectField(field) {
    const { input, label, value, children, meta: { touched, error } } = field;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select className="form-control" value={value} id={name} {...input}>{children}</select>
        {touched && error && <div className="error">{error}</div>}
      </div>
    )
  }

  render() {
    const { activePoll, handleSubmit, submitting, hasCustom } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
          <Field name="optionId" value='' label='Cast your vote:' component={this.renderSelectField}>
            <option value='' disabled>--- Select an option ---</option>
            {activePoll.options.map(option => <option key={option._id} value={option._id}>{option.name}</option>)}
            {this.props.authenticated ? <option value='custom'>Enter a custom option</option> : ''}
          </Field>
          { hasCustom ? <Field name="customOption" type="text" component={this.renderField} placeholder="Your custom option.."/> : ''} 
          {this.renderError()}
          <button className="btn btn-primary" disabled={submitting} type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.optionId)
    errors.optionId = 'Please select an option';

  return errors;
}

const VotingForm = reduxForm({
  form: 'VotingForm',
  validate
})(Voting);

const selector = formValueSelector('VotingForm');

const mapStateToProps = (state) => {
  const hasCustom = (selector(state, 'optionId') === 'custom');
  
  return {
    activePoll: state.polls.activePoll,
    errorMessage: state.polls.error,
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    hasCustom,
  }
}

export default connect(mapStateToProps, { updateVoters, clearErrorAction })(VotingForm);