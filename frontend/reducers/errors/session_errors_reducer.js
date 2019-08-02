import { RECEIVE_CURRENT_USER, 
         RECEIVE_SESSION_ERRORS, 
         CLEAR_ERRORS 
} from '../../actions/session_actions';

const sessionErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    debugger
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return state.concat(action.errors);
        case CLEAR_ERRORS:
            return [];
        case RECEIVE_CURRENT_USER:
            return [];
        default:
            return state;
    }
};

export default sessionErrorsReducer;