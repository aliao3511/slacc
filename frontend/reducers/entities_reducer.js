import { combineReducers } from 'redux';
import usersReducer from './entities/users_reducer';
import channelsReducer from './entities/channels_reducer';
import messagesReducer from './entities/messages_reducer';
import dmsReducer from './entities/dms_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    dms: dmsReducer,
});

export default entitiesReducer;