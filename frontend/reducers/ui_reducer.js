import { combineReducers } from 'redux';
import emailFormReducer from './email_reducer';

const uiReducer = combineReducers({
    emailForm: emailFormReducer,
});

export default uiReducer;