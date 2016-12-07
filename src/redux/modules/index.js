import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import catalog from './catalog';
import service from './service';

export default combineReducers({
  counter,
  service,
  catalog,
  router
});
