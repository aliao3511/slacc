import { SELECT_CHANNEL } from './../../actions/channel_actions';

const selectedReducer = (state = { id: null }, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case SELECT_CHANNEL:
            return Object.assign({}, { id: action.id });
        default:
            return state;
    }
}

export default selectedReducer;