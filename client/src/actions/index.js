import axios from 'axios';
import { createAction } from 'redux-actions';
import {
  LOGIN_USER,
  REAUTH_USER,
  LOGOUT_USER,
  AUTH_ERROR,
  CLEAR_ERROR,
  FETCH_POLLS_SUCCESS,
  FETCH_POLLS_FAILURE,
  FETCH_POLL_SUCCESS,
  FETCH_POLL_FAILURE,
  CREATE_POLL_SUCCESS,
  CREATE_POLL_FAILURE,
  UPDATE_VOTERS_SUCCESS,
  UPDATE_VOTERS_FAILURE,
  DELETE_POLL_SUCCESS,
  DELETE_POLL_FAILURE
} from './types';
import { saveToken, removeToken, getToken } from '../helpers/localStorage';
import { browserHistory } from 'react-router';

const ROOT_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3090';

export const loginUserAction = createAction(LOGIN_USER);
export const reauthUserAction = createAction(REAUTH_USER);
export const logoutUserAction = createAction(LOGOUT_USER);
export const authErrorAction = createAction(AUTH_ERROR);
export const clearErrorAction = createAction(CLEAR_ERROR);
export const fetchPollsSuccess = createAction(FETCH_POLLS_SUCCESS);
export const fetchPollsFailure = createAction(FETCH_POLLS_FAILURE);
export const fetchPollSuccess = createAction(FETCH_POLL_SUCCESS);
export const fetchPollFailure = createAction(FETCH_POLL_FAILURE);
export const createPollSuccess = createAction(CREATE_POLL_SUCCESS);
export const createPollFailure = createAction(CREATE_POLL_FAILURE);
export const updateVotersSuccess = createAction(UPDATE_VOTERS_SUCCESS);
export const updateVotersFailure = createAction(UPDATE_VOTERS_FAILURE);
export const deletePollSuccess = createAction(DELETE_POLL_SUCCESS);
export const deletePollFailure = createAction(DELETE_POLL_FAILURE);


export function loginUser(creds) {
  return function (dispatch) { // thunk
    axios.post(`${ROOT_URL}/signin`, creds)
      .then((response) => {
        dispatch(loginUserAction(response.data.user));
        if (!saveToken(response.data.token)) {
          alert('Token is not saved. Please enable browser cache.');
        }
        browserHistory.push('/');
      })
      .catch(() => {
        dispatch(authErrorAction('Wrong email/password combination.'));
      })
  }
}


export function logoutUser() {
  return function(dispatch) {
    if(!removeToken()){
      alert('Unable to remove token');
    }
    dispatch(logoutUserAction());
    browserHistory.push('/');
  }
}

export function signUpUser(creds) {
  return function (dispatch) { 
    axios.post(`${ROOT_URL}/signup`, creds)
      .then((response) => {
        dispatch(loginUserAction(response.data.user));
        if (!saveToken(response.data.token)) {
          alert('Token is not saved. Please enable browser cache.');
        }
        browserHistory.push('/');
      })
      .catch((error) => {
        dispatch(authErrorAction(error.message));
      })
  }
}

export function fetchPolls() {
  return function (dispatch) { 
    axios.get(`${ROOT_URL}/polls`)
      .then((response) => {
        dispatch(fetchPollsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchPollsFailure(error.message));
      })
  }
}

export function createPoll(poll) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/polls/create`,{ 
      headers: { authorization: getToken() },
      data: poll
    }).then((response) => {
      dispatch(createPollSuccess(response.data));
      browserHistory.push(`/${response.data._id}`);
    })
    .catch((error)=> {
      dispatch(createPollFailure(error.message))
    })
  }
}

export function fetchPoll(pollId) {
  return function(dispatch, getState){
    const polls = getState().polls.polls;
    const activePoll = polls.find((poll)=>{
      return poll._id === pollId
    })
    dispatch(fetchPollSuccess(activePoll));
  }
  // return function (dispatch) { 
  //   axios.get(`${ROOT_URL}/polls/${pollId}`)
  //     .then((response) => {
  //       dispatch(fetchPollSuccess(response.data));
  //     })
  //     .catch((error) => {
  //       dispatch(fetchPollFailure(error.message));
  //     })
  // }
}

export function updateVoters(vote) {
  return function(dispatch) {
    axios.put(`${ROOT_URL}/polls/`,vote)
      .then((response) => {
        dispatch(updateVotersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(updateVotersFailure(error.response.data));
      })
  }
}

export function deletePoll(poll) {
  return function(dispatch){
    axios.delete(`${ROOT_URL}/polls`,{ 
      headers: { authorization: getToken() },
      data: poll
    }).then((response) => {
      dispatch(deletePollSuccess());
      browserHistory.push('/');
    }).catch((error)=>{
      dispatch(deletePollFailure(error.response.data));
    })
  }
}