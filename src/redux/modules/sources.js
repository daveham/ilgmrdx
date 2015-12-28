import { RECEIVE_CATALOG } from './constants';
import debugLib from 'debug';
const debug = debugLib('app:redux:sources');

// reducer
export default function sources (state = [], action) {
  debug('reducer, action:', action);
  switch (action.type) {
    case RECEIVE_CATALOG:
      return action.payload.sources;
    default:
      return state;
  }
}
