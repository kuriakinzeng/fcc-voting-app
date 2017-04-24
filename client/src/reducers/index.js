import { combineReducers } from 'redux';
import auth from './authReducer';
import polls from './pollsReducer';
import { reducer as formReducer } from 'redux-form';
import { UPDATE_VOTERS_SUCCESS } from '../actions/types';

export default combineReducers({
    auth,
    form: formReducer.plugin({
        VotingForm: (state,action) => {
            switch(action.type){
                case UPDATE_VOTERS_SUCCESS:
                    return undefined;
                default:
                    return state;
            }
        }
    }),
    polls
});