import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser, clearErrorAction } from '../actions/';

class SignInForm extends Component {
  componentWillUnmount(){
    this.props.clearErrorAction();
  }
  submitForm(creds) {
    this.props.loginUser(creds);
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

  render() {
    const { handleSubmit, submitting, pristine, reset } = this.props;
    return (
      <div>
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
          <Field name="email" type="email" component={this.renderField} placeholder="Email"/>
          <Field name="password" type="password" component={this.renderField} placeholder="Password"/>
          { this.renderError() }
          <button className="btn btn-primary" disabled={submitting} type="submit">Submit</button>
          <button className="btn btn-link" disabled={pristine || submitting} type="button" onClick={reset}>Reset</button>
        </form>
      </div>
    );
  }
}

function validate(values){
  const errors = {};
  if(!values.email)
    errors.email = 'Email is required';
  if(!values.password)
    errors.password = 'Password is required';  
  return errors;
}

const SignIn = reduxForm({
  form: 'signin',
  validate
})(SignInForm);


export default connect((state)=>({errorMessage: state.auth.error}), {clearErrorAction, loginUser})(SignIn);