import { combineReducers } from 'redux';
import usersReducer from './entities/users_reducer';
import channelsReducer from './entities/channels_reducer';
import messagesReducer from './entities/messages_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
});

export default entitiesReducer;