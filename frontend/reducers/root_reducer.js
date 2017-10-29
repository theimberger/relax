import session from './sessions_reducer';
import entities from './entities_reducer';
import errors from './errors_reducer';

import { combineReducers } from 'redux';

const RootReducer = combineReducers({
  session,
  entities,
  errors
});

export default RootReducer;
