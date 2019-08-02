import { combineReducers } from 'redux';
import usersReducer from './entities/users_reducer';
import channelsReducer from './entities/channels_reducer'

const entitiesReducer = combineReducers({
    users: usersReducer,
    channels: channelsReducer,
});

export default entitiesReducer;