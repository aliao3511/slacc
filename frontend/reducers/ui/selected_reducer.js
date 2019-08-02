import { SELECT_CHANNEL } from './../../actions/channel_actions';

const selectedReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    debugger
    switch (action.type) {
        case SELECT_CHANNEL:
            return Object.assign({}, { id: action.id });
        default:
            return state;
    }
}

export default selectedReducer;