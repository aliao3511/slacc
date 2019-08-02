import { combineReducers } from 'redux';
import emailFormReducer from './ui/email_reducer';
import selectedReducer from './ui/selected_reducer';

const uiReducer = combineReducers({
    emailForm: emailFormReducer,
    selected: selectedReducer,
});

export default uiReducer;