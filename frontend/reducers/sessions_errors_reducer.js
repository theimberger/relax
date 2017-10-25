import { RECEIVE_ERRORS } from '../actions/session_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const sessionErrorsReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_ERRORS:
      return action.errors.responseJSON;
    case RECEIVE_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default sessionErrorsReducer;
