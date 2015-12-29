import { createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { REQUEST_SOURCE_METADATA, RECEIVE_SOURCE_METADATA, REQUEST_SOURCE_METADATA_FAILED } from './constants';
import debugLib from 'debug';
const debug = debugLib('app:redux:sources-metadata');

// actions
export const requestSourceMetadata = createAction(REQUEST_SOURCE_METADATA);
export const receiveSourceMetadata = createAction(RECEIVE_SOURCE_METADATA);
export const requestSourceMetadataFailed = createAction(REQUEST_SOURCE_METADATA_FAILED);
export const fetchSourceMetadata = (id) => {
  return (dispatch, getState) => {
    dispatch(requestSourceMetadata({ id }));

    return fetch(`/api/sourcemetadata/${id}`)
      .then(response => response.json())
      .then(json => {
        debug('fetch response', json);
        dispatch(receiveSourceMetadata(json));
      })
      .catch(reason => {
        debug('fetch error', reason);
        dispatch(requestSourceMetadataFailed({ id, reason }));
      });
  };
};

export const actions = {
  requestSourceMetadata,
  receiveSourceMetadata,
  requestSourceMetadataFailed,
  fetchSourceMetadata
};

const objectReducer = (state = {}, action) => {
  return Object.assign({}, state, action.payload, { loading: false });
};
const objectLoadingReducer = (state = {}, loading) => {
  return Object.assign({ loading }, state);
};

// reducer
export default function sources (state = {}, action) {
  debug('reducer, action:', action);

  let id;
  switch (action.type) {
    case REQUEST_SOURCE_METADATA:
      id = action.payload.id;
      return Object.assign({}, state, { [id]: objectLoadingReducer(state[id], true) });

    case REQUEST_SOURCE_METADATA_FAILED:
      id = action.payload.id;
      return Object.assign({}, state, { [id]: objectLoadingReducer(state[id], false) });

    case RECEIVE_SOURCE_METADATA:
      id = action.payload.id;
      return Object.assign({}, state, { [id]: objectReducer(state[id], action) });
    default:
      return state;
  }
}
