import { RECEIVE_ERRORS } from '../actions/session_actions';

const sessionErrorsReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_ERRORS:
      return Object.assign({}, state, {sessionErrors: action.errors.resonseJSON});
    default:
      return state;
  }
};

export default sessionErrorsReducer;
