import { RECEIVE_CURRENT_USER, RECEIVE_USERS, UPDATE_USER_CHANNELS } from '../../actions/session_actions';
import { REMOVE_CHANNEL } from '../../actions/channel_actions';
import { merge } from 'lodash';
import channel from '../../components/channel/channel';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            newState = merge({}, state, { [action.user.id]: action.user });
            return newState;
        // case RECEIVE_USERS:
        //     newState = merge({}, action.users)
        //     return newState;
        case RECEIVE_USERS:
            newState = merge({}, state);
            Object.keys(action.users).forEach(userId => newState[userId] = action.users[userId]);
            return newState;
        case UPDATE_USER_CHANNELS:
            newState = merge({}, state);
            if (!newState[action.userId].channel_ids.includes(action.channelId)) {
                newState[action.userId].channel_ids.push(action.channelId);
            }
            return newState;
        case REMOVE_CHANNEL:
            newState = merge({}, state);
            newState[action.userId].channel_ids = newState[action.userId].channel_ids.filter(id => id != action.channelId);
            return newState;
        default:
            return state;
    }
};

export default usersReducer;