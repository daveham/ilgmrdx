import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import counter from './counter';
import catalog from './catalog';
import service from './service';

export default combineReducers({
  counter,
  service,
  catalog,
  router: routeReducer
});
