import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
//testing
import { signup, login, logout } from './actions/session_actions';
//testing

document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
        debugger
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        debugger
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    // testing
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.signup = signup;
    window.login = login;
    window.logout = logout;
    //testing

    ReactDOM.render(<Root store={ store }/>, document.getElementById('root'));
});