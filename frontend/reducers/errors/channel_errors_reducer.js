import {
    RECEIVE_CHANNELS,
    RECEIVE_CHANNEL,
    RECEIVE_CHANNEL_ERRORS,
} from '../../actions/channel_actions';
import { CLEAR_ERRORS } from '../../actions/session_actions';

const channelErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CHANNEL_ERRORS:
            return state.concat(action.errors);
        case CLEAR_ERRORS:
            return [];
        case RECEIVE_CHANNELS:
            return [];
        case RECEIVE_CHANNEL:
            return [];
        default:
            return state;
    }
};

export default channelErrorsReducer;