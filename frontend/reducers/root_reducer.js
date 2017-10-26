import session from './sessions_reducer';
import spaces from './spaces_reducer';
import errors from './errors_reducer';

import { combineReducers } from 'redux';

const RootReducer = combineReducers({
  session,
  spaces,
  errors
});

export default RootReducer;
