import { 
  FETCH_POLLS_SUCCESS,
  FETCH_POLLS_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    polls: [],
    error: null
};

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case FETCH_POLLS_SUCCESS:
            return {...state, polls: action.payload, error: null}
        case FETCH_POLLS_FAILURE:
            return {...state, polls: [], error: action.payload}            
        default:
            return state;
    }
}