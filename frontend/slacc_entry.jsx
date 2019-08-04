import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';
//testing
import { getChannels, getChannel, createChannel, destroyChannel } from './actions/channel_actions';
// import { getChannelMessages } from './actions/message_actions';
// import { getChannelMembers } from './actions/session_actions';
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
    // window.getChannels = getChannels;
    // window.getChannel = getChannel;
    // window.destroyChannel = destroyChannel;
    window.createChannel = createChannel;
    // window.getChannelMessages = getChannelMessages;
    // window.getChannelMembers = getChannelMembers;
    //testing

    ReactDOM.render(<Root store={ store }/>, document.getElementById('root'));
});