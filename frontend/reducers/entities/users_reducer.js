import { RECEIVE_CURRENT_USER, RECEIVE_USERS, UPDATE_USER_CHANNELS } from '../../actions/session_actions';
import { REMOVE_CHANNEL } from '../../actions/channel_actions';
import { merge } from 'lodash';
import channel from '../../components/channel/channel';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    debugger
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            newState = merge({}, state, { [action.user.id]: action.user });
            return newState;
        case RECEIVE_USERS:
            newState = merge({}, action.users)
            return newState;
        case UPDATE_USER_CHANNELS:
            newState = merge({}, state);
            newState[action.userId].channel_ids << action.channelId;
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