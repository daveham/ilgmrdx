import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import counter from './counter';
import catalog from './catalog';

export default combineReducers({
  counter,
  catalog,
  router: routeReducer
});
