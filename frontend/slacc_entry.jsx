import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
//testing
import { getDms, getDm, createDm } from './actions/dm_actions';
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
    window.getDms = getDms;
    window.getDm = getDm;
    window.createDm = createDm;
    //testing

    ReactDOM.render(<Root store={ store }/>, document.getElementById('root'));
});