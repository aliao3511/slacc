import {
    RECEIVE_DMS,
    RECEIVE_DM,
    RECEIVE_DM_ERRORS,
} from '../../actions/dm_actions';
import { CLEAR_ERRORS } from '../../actions/session_actions';

const dmErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_DM_ERRORS:
            return state.concat(action.errors);
        case CLEAR_ERRORS:
            return [];
        case RECEIVE_DMS:
            return [];
        case RECEIVE_DM:
            return [];
        default:
            return state;
    }
};

export default dmErrorsReducer;