import { 
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_ERROR,
  CLEAR_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    authenticated: false,
    userEmail: null,
    error: null
};

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case LOGIN_USER:
            return { ...state, authenticated: true, userEmail: action.payload }; 
        case LOGOUT_USER:
            return { ...state, authenticated: false, userEmail: null }; 
        case AUTH_ERROR:
            return { ...state, error: action.payload }; 
        case CLEAR_ERROR:
            return { ...state, error: null };     
        default:
            return state;
    }
}