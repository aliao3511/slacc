import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const VERIFY_USER = 'VERIFY_USER';

// action creators
const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user,
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
});

const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors,
});

export const clearErrors = errors => ({
    type: CLEAR_ERRORS,
    errors,
});

const verifyUser = user => ({
    type: VERIFY_USER,
    user
})

// thunk action creators
export const login = formUser => dispatch => {
    return SessionAPIUtil.login(formUser)
        .then(currentUser => {
            dispatch(receiveCurrentUser(currentUser))
        },
            errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const logout = () => dispatch => {
    return SessionAPIUtil.logout()
        .then(() => dispatch(logoutCurrentUser(),
            errors => dispatch(receiveErrors(errors.responseJSON))));
};

export const signup = formUser => dispatch => {
    return SessionAPIUtil.signup(formUser)
        .then(currentUser => dispatch(receiveCurrentUser(currentUser)),
            errors => dispatch(receiveErrors(errors.responseJSON)));
}

export const verifyEmail = email => dispatch => {
    return SessionAPIUtil.verifyEmail(email)
        .then(user => dispatch(verifyUser(user)))
};