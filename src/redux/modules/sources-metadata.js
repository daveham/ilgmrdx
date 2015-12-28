import { RECEIVE_SOURCE_METADATA } from './constants';
import debugLib from 'debug';
const debug = debugLib('app:redux:sources-metadata');

// reducer
export default function sources (state = [], action) {
  debug('reducer, action:', action);
  switch (action.type) {
    case RECEIVE_SOURCE_METADATA:
      return action.payload; // TODO, this by item
    default:
      return state;
  }
}
