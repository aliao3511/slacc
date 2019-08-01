import React from 'react';
import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, signup, clearErrors, clearVerifiedUser } from '../../actions/session_actions';

const mapStateToProps = state => ({
    errors: state.errors.session,
    formType: 'sign up',
    email: state.ui.emailForm.email || '',
});

const mapDispatchToProps = dispatch => ({
    processForm: user => dispatch(signup(user)),
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
    clearVerifiedUser: () => dispatch(clearVerifiedUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);