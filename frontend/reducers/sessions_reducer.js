import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const nullUser = Object.freeze({
  currentUser: null
});

const sessionsReducer = (state = nullUser, action) => {
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {currentUser: action.currentUser});
    default:
      return state;
  }
};

export default sessionsReducer;
