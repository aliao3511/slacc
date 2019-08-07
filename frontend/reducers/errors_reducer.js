import { combineReducers } from 'redux';
import sessionErrorsReducer from './errors/session_errors_reducer';
import channelErrorsReducer from './errors/channel_errors_reducer';
import dmErrorsReducer from './errors/dm_errors_reducer';

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    channel: channelErrorsReducer,
    dm: dmErrorsReducer
});

export default errorsReducer;