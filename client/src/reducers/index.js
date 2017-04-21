import { combineReducers } from 'redux';
import auth from './authReducer';
import polls from './pollsReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth,
    form: formReducer,
    polls
});