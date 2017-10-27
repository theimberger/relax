import {
  RECEIVE_SPACE_ERRORS,
  RECEIVE_SINGLE_SPACE,
  RECEIVE_USER_SPACES,
  CREATE_SPACE,
  UPDATE_SPACE
} from '../actions/spaces_actions';

const spacesErrorsReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_SPACE_ERRORS:
      return action.errors.responseJSON;

    case RECEIVE_SINGLE_SPACE:
    case RECEIVE_USER_SPACES:
    case CREATE_SPACE:
    case UPDATE_SPACE:
      return {};

    default:
      return state;
  }
};

export default spacesErrorsReducer;
