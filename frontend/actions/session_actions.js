import * as ApiUtils from '../utils/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const login = user => dispatch => (
  ApiUtils.login(user).then( (res) => dispatch(receiveCurrentUser(res)),
  err => dispatch(receiveErrors(err)))
);

export const logout = () => dispatch => (
  ApiUtils.logout().then(() => dispatch(receiveCurrentUser( null )),
  err => dispatch(receiveErrors(err)))
);

export const signup = (user) => dispatch => (
  ApiUtils.signUp(user).then( res => dispatch(receiveCurrentUser(res)),
  err => dispatch(receiveErrors(err)))
);
