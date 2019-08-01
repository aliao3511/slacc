import { VERIFY_USER } from '../actions/session_actions';

const emailReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case VERIFY_USER:
            return Object.assign(action.user);
        default:
            return state;
    }
};

export default emailReducer;