import * as ApiUtils from '../utils/space_api_util';

export const RECEIVE_USER_SPACES = "RECEIVE_USER_SPACES";
export const RECEIVE_SINGLE_SPACE = "RECEIVE_SINGLE_SPACE";
export const CREATE_SPACE = "CREATE_SPACE";
export const UPDATE_SPACE = "UPDATE_SPACE";
export const RECEIVE_SPACE_ERRORS = "RECEIVE_SPACE_ERRORS";

const receiveUserSpaces = (spaces) => ({
  type: RECEIVE_USER_SPACES,
  spaces
});

const receiveSingleSpace = (space) => ({
  type: RECEIVE_SINGLE_SPACE,
  space
});

const receiveSpaceErrors = (errors) => ({
  type: RECEIVE_SPACE_ERRORS,
  errors
});

const createSpace = (space) => ({
  type: CREATE_SPACE,
  space
});

const editSpace = (space) => ({
  type: UPDATE_SPACE,
  space
});

export const postSpace = (space) => dispatch => (
  ApiUtils.createSpace(space).then( res => dispatch(createSpace(res)),
  err => dispatch(receiveSpaceErrors(err)))
);

export const updateSpace = (space) => dispatch => (
  ApiUtils.updateSpace(space).then( res => dispatch(editSpace(res)),
  err => dispatch(receiveSpaceErrors(err)))
);

export const requestUserSpaces = () => dispatch => (
  ApiUtils.fetchUserSpaces().then( res => dispatch(receiveUserSpaces(res)),
  err => dispatch(receiveSpaceErrors(err)))
);

export const requestSingleSpace = (id) => dispatch => (
  ApiUtils.fetchSingleSpace(id).then( res => dispatch(receiveSingleSpace(res)),
  err => dispatch(receiveSpaceErrors(err)))
);
