import { createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import debugLib from 'debug';
const debug = debugLib('app:redux:sources-metadata');

const REQUEST_SOURCE_METADATA = 'REQUEST_SOURCE_METADATA';
const RECEIVE_SOURCE_METADATA = 'RECEIVE_SOURCE_METADATA';
const REQUEST_SOURCE_METADATA_FAILED = 'REQUEST_SOURCE_METADATA_FAILED';

const REQUEST_SOURCE_METADATA_DELETE = 'REQUEST_SOURCE_METADATA_DELETE';
const REQUEST_SOURCE_METADATA_DELETE_FAILED = 'REQUEST_SOURCE_METADATA_DELETE_FAILED';
const REQUEST_SOURCE_METADATA_DELETED = 'REQUEST_SOURCE_METADATA_DELETED';

// actions
const requestSourceMetadata = createAction(REQUEST_SOURCE_METADATA);
const receiveSourceMetadata = createAction(RECEIVE_SOURCE_METADATA);
const requestSourceMetadataFailed = createAction(REQUEST_SOURCE_METADATA_FAILED);
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

const sourceMetadataDelete = createAction(REQUEST_SOURCE_METADATA_DELETE);
const sourceMetadataDeleted = createAction(REQUEST_SOURCE_METADATA_DELETED);
const sourceMetadataDeleteFailed = createAction(REQUEST_SOURCE_METADATA_DELETE_FAILED);
export const deleteSourceMetadata = (id) => {
  return (dispatch, getState) => {
    dispatch(sourceMetadataDelete({ id }));

    return fetch(`/api/sourcemetadata/${id}`, { method: 'delete' })
      .then(() => {
        dispatch(sourceMetadataDeleted({ id }));
      })
      .catch(reason => {
        debug('fetch.delete', reason);
        dispatch(sourceMetadataDeleteFailed({ id, reason }));
      });
  };
};

export const actions = {
  fetchSourceMetadata,
  deleteSourceMetadata
};

const objectReducer = (state = {}, action) => {
  return Object.assign({}, state, action.payload, { loading: false });
};
const objectLoadingReducer = (state = {}, loading) => {
  return Object.assign({ loading }, state);
};

// reducer
export default (state = {}, action) => {
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

    case REQUEST_SOURCE_METADATA_DELETED:
      id = action.payload.id;
      const cloneState = Object.assign({}, state);
      delete cloneState[id];
      return cloneState;

    default:
      return state;
  }
};
