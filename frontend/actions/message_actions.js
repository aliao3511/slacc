import * as MessageAPIUtil from '../util/message_util';

export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

// action creators
const receiveMessages = messages => ({
    type: RECEIVE_MESSAGES,
    messages
})


// thunk action creators
export const getChannelMessages = channelId => dispatch => {
    return MessageAPIUtil.getChannelMessages(channelId)
        .then(messages => {
            dispatch(receiveMessages(messages))
        });
};
