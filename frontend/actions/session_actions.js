import * as SessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const VERIFY_USER = 'VERIFY_USER';
export const CLEAR_VERIFIED_USER = 'CLEAR_VERIFIED_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const UPDATE_USER_CHANNELS = 'UPDATE_USER_CHANNELS';

// action creators
const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user,
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
});

const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors,
});

export const clearErrors = errors => ({
    type: CLEAR_ERRORS,
    errors,
});

const verifyUser = user => ({
    type: VERIFY_USER,
    user
});

export const clearVerifiedUser = user => ({
    type: CLEAR_VERIFIED_USER,
});

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const updateUserChannels = (channelId, userId) => ({
    type: UPDATE_USER_CHANNELS,
    channelId,
    userId
});

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

export const getChannelMembers = channelId => dispatch => {
    return SessionAPIUtil.getChannelMembers(channelId)
        .then(users => dispatch(receiveUsers(users)))
};

export const getAllMembers = () => dispatch => {
    return SessionAPIUtil.getAllMembers()
        .then(users => dispatch(receiveUsers(users)))
};

export const getUsersById = userIds => dispatch => {
    return SessionAPIUtil.getUsersById(userIds)
        .then(users => dispatch(receiveUsers(users)))
}


