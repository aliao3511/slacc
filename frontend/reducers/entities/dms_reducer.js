import { RECEIVE_DMS, RECEIVE_DM, UPDATE_USER_DMS } from '../../actions/dm_actions';
import { merge } from 'lodash';

const dmsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
        case RECEIVE_DMS:
            newState = merge({}, action.dms);
            return newState;
        case RECEIVE_DM:
            newState = merge({}, state, { [action.dm.id]: action.dms });
            return newState;
        // case DELETE_DM:
        //     newState = merge({}, state);
        //     delete newState[action.id];
        //     return newState;
        // case UPDATE_USER_DMS:
        //     newState = merge({}, state);
        //     if (!newState[action.dmId].member_ids.includes(action.userId)) {
        //         newState[action.dmId].member_ids.push(action.userId);
        //     }
        //     return newState;
        default:
            return state;
    }
};

export default dmsReducer;