import * as MessageAPIUtil from '../util/message_util';

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

// action creators
const receiveMessages = messages => ({
    type: RECEIVE_MESSAGES,
    messages
})

export const receiveMessage = message => ({
    type: RECEIVE_MESSAGE,
    message
})

// thunk action creators
export const getChannelMessages = channelId => dispatch => {
    return MessageAPIUtil.getChannelMessages(channelId)
        .then(messages => {
            dispatch(receiveMessages(messages))
        });
};

export const getDmMessages = dmId => dispatch => {
    return MessageAPIUtil.getDmMessages(dmId)
        .then(messages => {
            dispatch(receiveMessages(messages))
        });
};
