import { 
  FETCH_POLLS_SUCCESS,
  FETCH_POLLS_FAILURE,
  FETCH_POLL_SUCCESS,
  FETCH_POLL_FAILURE,
  CREATE_POLL_SUCCESS,
  CREATE_POLL_FAILURE,
  UPDATE_VOTERS_SUCCESS,
  UPDATE_VOTERS_FAILURE,
  DELETE_POLL_SUCCESS,
  DELETE_POLL_FAILURE,
  CLEAR_ERROR
} from '../actions/types';

const INITIAL_STATE = {
    polls: [],
    activePoll: null,
    error: null
};

export default function (state = INITIAL_STATE, action){
    switch(action.type){
        case CLEAR_ERROR:
            return {...state, error: null}
        case FETCH_POLLS_SUCCESS:
            return {...state, polls: action.payload, error: null}
        case FETCH_POLLS_FAILURE:
            return {...state, polls: [], error: action.payload}
        case FETCH_POLL_SUCCESS:
            return {...state, activePoll: action.payload, error: null}
        case FETCH_POLL_FAILURE:
            return {...state, activePoll: null, error: action.payload}    
        case CREATE_POLL_SUCCESS:
            return {...state, activePoll: action.payload, error: null}
        case CREATE_POLL_FAILURE:
            return {...state, activePoll: null, error: action.payload}
        case UPDATE_VOTERS_SUCCESS:
            return {...state, activePoll: action.payload, error: null}
        case UPDATE_VOTERS_FAILURE:
            return {...state, error: action.payload}
        case DELETE_POLL_SUCCESS:
            return {...state}
        case DELETE_POLL_FAILURE:
            return {...state, error: action.payload}    
        default:
            return state;
    }
}