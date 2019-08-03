import { RECEIVE_MESSAGES } from '../../actions/message_actions';

const messagesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_MESSAGES:
            newState = Object.assign({}, action.messages)
            return newState;
        default:
            return state;
    }
};

export default messagesReducer;