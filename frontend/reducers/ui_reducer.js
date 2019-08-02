import { combineReducers } from 'redux';
import emailFormReducer from './ui/email_reducer';

const uiReducer = combineReducers({
    emailForm: emailFormReducer,
});

export default uiReducer;