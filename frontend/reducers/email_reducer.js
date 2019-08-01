import { VERIFY_USER, CLEAR_USER, CLEAR_VERIFIED_USER } from '../actions/session_actions';

const emailFormReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case VERIFY_USER:
            return Object.assign(action.user);
        case CLEAR_VERIFIED_USER:
            return {};
        default:
            return state;
    }
};

export default emailFormReducer;