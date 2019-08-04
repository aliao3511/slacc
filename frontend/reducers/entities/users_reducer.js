import { RECEIVE_CURRENT_USER, RECEIVE_USERS } from '../../actions/session_actions';
import { merge } from 'lodash';

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
        default:
            return state;
    }
};

export default usersReducer;