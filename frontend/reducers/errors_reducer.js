import sessionsErrorsReducer from './sessions_errors_reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  session: sessionsErrorsReducer
});
