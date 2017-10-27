import {
  RECEIVE_SPACE_ERRORS,
  RECEIVE_SINGLE_SPACE,
  RECEIVE_USER_SPACES,
  CREATE_SPACE,
  UPDATE_SPACE
} from '../actions/spaces_actions';

const spacesReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_USER_SPACES:
      let newState = Object.assign({}, state);
      action.spaces.forEach((space) => {
        newState[space.id] = space;
      });
      return newState;
    case CREATE_SPACE:
    case UPDATE_SPACE:
      newState = Object.assign({}, state);
      newState[action.space.id] = action.space;
      return newState;
      
    case RECEIVE_SPACE_ERRORS:
    default:
      return state;
  }
};

export default spacesReducer;
