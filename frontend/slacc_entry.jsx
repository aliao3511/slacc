import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
//testing
import { signup, login, logout, verifyEmail, clearVerifiedUser } from './actions/session_actions';
//testing

document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    // testing
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // window.signup = signup;
    // window.login = login;
    // window.logout = logout;
    window.verifyEmail = verifyEmail;
    window.clearVerifiedUser = clearVerifiedUser;
    //testing

    ReactDOM.render(<Root store={ store }/>, document.getElementById('root'));
});