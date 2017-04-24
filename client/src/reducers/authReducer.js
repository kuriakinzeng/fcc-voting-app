import { 
  LOGIN_USER,
  LOGOUT_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  REAUTH_USER,
} from '../actions/types';

const INITIAL_STATE = {
    authenticated: false,
    user: null,
    error: null
};

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case LOGIN_USER:
            return { ...state, authenticated: true, user: action.payload }; 
        case REAUTH_USER:
            return {...state, authenticated: true}
        case LOGOUT_USER:
            return { ...state, authenticated: false, user: null }; 
        case AUTH_ERROR:
            return { ...state, error: action.payload }; 
        case CLEAR_ERROR:
            return { ...state, error: null };     
        default:
            return state;
    }
}