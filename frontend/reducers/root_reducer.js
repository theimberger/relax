import sessionReducer from './sessions_reducer';
import errorsReducer from './errors_reducer';

import { combineReducers } from 'redux';

export default combineReducers({
  sessions: sessionReducer,
  errors: errorsReducer
});
