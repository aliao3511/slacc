import * as ChannelAPIUtil from '../util/channel_util';

export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS';
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL';
export const RECEIVE_CHANNEL_ERRORS = 'RECEIVE_CHANNEL_ERRORS';
export const DELETE_CHANNEL = 'DELETE_CHANNEL';
export const SELECT_CHANNEL = 'SELECT_CHANNEL';
export const ADD_CHANNEL = 'ADD_CHANNEL';
export const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

// action creators
const receiveChannels = channels => ({
    type: RECEIVE_CHANNELS,
    channels
});

export const receiveChannel = channel => ({
    type: RECEIVE_CHANNEL,
    channel
});

const receiveErrors = errors => ({
    type: RECEIVE_CHANNEL_ERRORS,
    errors,
});

const deleteChannel = id => ({
    type: DELETE_CHANNEL,
    id,
})

export const clearErrors = errors => ({
    type: CLEAR_ERRORS,
    errors,
});

export const selectChannel = id => ({
    type: SELECT_CHANNEL,
    id
});

export const removeChannel = (channelId, userId) => ({
    type: REMOVE_CHANNEL,
    channelId,
    userId,
});

// thunk action creators
export const getChannels = userId => dispatch => {
    return ChannelAPIUtil.getChannels(userId)
        .then(channels => {
            dispatch(receiveChannels(channels))
        },
            errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const getChannel = id => dispatch => {
    return ChannelAPIUtil.getChannel(id)
        .then(channel => {
            dispatch(receiveChannel(channel))
        },
            errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const createChannel = (channel, memberIds) => dispatch => {
    debugger
    return ChannelAPIUtil.createChannel(channel, memberIds)
        .then(channel => {
            return dispatch(receiveChannel(channel));
        },
            errors => dispatch(receiveErrors(errors.responseJSON)));
};
// export const createChannel = channel => dispatch => {
//     return ChannelAPIUtil.createChannel(channel)
//         .then(channel => {
//             return dispatch(receiveChannel(channel));
//         },
//             errors => dispatch(receiveErrors(errors.responseJSON)));
// };

export const destroyChannel = id => dispatch => {
    return ChannelAPIUtil.deleteChannel(id)
        .then(channel => dispatch(deleteChannel(channel.id)),
            errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const addChannel = (channelId, userIds) => dispatch => {
    return ChannelAPIUtil.addChannel(channelId, userIds)
        .then(channel => dispatch(receiveChannel(channel)),
            errors => dispatch(receiveErrors(errors.responseJSON)))
};

export const leaveChannel = channelId => dispatch => {
    return ChannelAPIUtil.leaveChannel(channelId)
        .then(channelMember => {
            dispatch(removeChannel(channelMember.channel_id, channelMember.user_id))
        });
};

