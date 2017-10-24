import sessionReducer from './sessions_reducer';
import errorsReducer from './errors_reducer';

import { combineReducers } from 'redux';

export default combineReducers({
  session: sessionReducer,
  errors: errorsReducer
});
