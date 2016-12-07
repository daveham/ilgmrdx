import { createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import debugLib from 'debug';
const debug = debugLib('app:redux:sources-thumbs');

const REQUEST_SOURCE_THUMBS = 'REQUEST_SOURCE_THUMBS';
const RECEIVE_SOURCE_THUMBS = 'RECEIVE_SOURCE_THUMBS';
const REQUEST_SOURCE_THUMBS_FAILED = 'REQUEST_SOURCE_THUMBS_FAILED';

const GENERATE_SOURCE_THUMB = 'GENERATE_SOURCE_THUMB';
const SOURCE_THUMB_GENERATED = 'SOURCE_THUMB_GENERATED';
const GENERATE_SOURCE_THUMB_FAILED = 'GENERATE_SOURCE_THUMB_FAILED';

// actions
const requestSourceThumbs = createAction(REQUEST_SOURCE_THUMBS);
const receiveSourceThumbs = createAction(RECEIVE_SOURCE_THUMBS);
const requestSourceThumbsFailed = createAction(REQUEST_SOURCE_THUMBS_FAILED);
export const fetchSourceThumbs = () => {
  return (dispatch /*, getState */) => {
    dispatch(requestSourceThumbs());

    return fetch('/api/sourcethumbs')
      .then(response => response.json())
      .then(json => {
        debug('get sourcethumbs response', json);
        dispatch(receiveSourceThumbs(json));
      })
      .catch(reason => {
        debug('get sourcethumbs error', reason);
        dispatch(requestSourceThumbsFailed({ reason }));
      });
  };
};

const generateSourceThumbStart = createAction(GENERATE_SOURCE_THUMB);
const sourceThumbGenerated = createAction(SOURCE_THUMB_GENERATED);
const generateSourceThumbFailed = createAction(GENERATE_SOURCE_THUMB_FAILED);
export const generateSourceThumb = (id, sourceName) => {
  return (dispatch /*, getState */) => {
    dispatch(generateSourceThumbStart({ id }));

    const body = JSON.stringify({ id, sourceName });
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
    return fetch('/api/sourcethumbs/', { method: 'POST', body, headers })
      .then(() => {
        dispatch(sourceThumbGenerated({ id }));
      })
      .catch(reason => {
        debug('generate source thumb error', reason);
        dispatch(generateSourceThumbFailed({ id, reason }));
      });
  };
};

export const actions = {
  fetchSourceThumbs,
  generateSourceThumb
};

// reducer
export default (state = {}, action) => {
  debug('reducer, action:', action);

  let newState;
  switch (action.type) {
    case REQUEST_SOURCE_THUMBS:
      return Object.assign({}, state, { loading: true });

    case REQUEST_SOURCE_THUMBS_FAILED:
      return Object.assign({}, state, { loading: false });

    case RECEIVE_SOURCE_THUMBS:
      newState = Object.assign({}, state, { loading: false });
      action.payload.forEach((item) => { newState[item] = 'ready'; });
      return newState;

    case GENERATE_SOURCE_THUMB:
      newState = Object.assign({}, state);
      newState[action.payload.id] = 'busy';
      return newState;

    case SOURCE_THUMB_GENERATED:
      newState = Object.assign({}, state);
      newState[action.payload.id] = 'ready';
      return newState;

    case GENERATE_SOURCE_THUMB_FAILED:
      newState = Object.assign({}, state);
      delete newState[action.payload.id];
      return newState;

    default:
      return state;
  }
};
