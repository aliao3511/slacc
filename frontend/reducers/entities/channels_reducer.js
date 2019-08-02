import { RECEIVE_CHANNELS, RECEIVE_CHANNEL, DELETE_CHANNEL, } from '../../actions/channel_actions';
import { merge } from 'lodash';

const channelsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    debugger
    switch (action.type) {
        case RECEIVE_CHANNELS:
            debugger
            newState = merge({}, action.channels);
            return newState;
        case RECEIVE_CHANNEL:
            debugger
            newState = merge({}, state, { [action.channel.id]: action.channel });
            return newState;
        case DELETE_CHANNEL:
            newState = merge({}, state);
            delete newState[action.id];
            return newState;
        default:
            return state;
    }
};

export default channelsReducer;