import { createAction,
         handleActions } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import debugLib from 'debug';
const debug = debugLib('app:redux:catalog');

// export const CATALOG_OPEN = 'CATALOG_OPEN';
export const REQUEST_CATALOG = 'REQUEST_CATALOG';
export const RECEIVE_CATALOG = 'RECEIVE_CATALOG';
export const REQUEST_CATALOG_FAILED = 'REQUEST_CATALOG_FAILED';

// actions
export const requestCatalog = createAction(REQUEST_CATALOG);
export const receiveCatalog = createAction(RECEIVE_CATALOG);
export const requestCatalogFailed = createAction(REQUEST_CATALOG_FAILED);
export const fetchCatalog = () => {
  return (dispatch, getState) => {
    dispatch(requestCatalog());

    return fetch('/api/catalog')
      .then(response => response.json())
      .then(json => {
        debug('fetch response', json);
        dispatch(receiveCatalog(json));
      })
      .catch(reason => {
        debug('fetch error', reason);
        dispatch(requestCatalogFailed(reason));
      });
  };
};

export const actions = {
  requestCatalog,
  receiveCatalog,
  requestCatalogFailed,
  fetchCatalog
};

const initialState = {
  name: null,
  loading: false,
  sources: []
};

// reducer
export default handleActions({
  REQUEST_CATALOG: (state, { payload }) => {
    return Object.assign({}, state, { loading: true });
  },
  RECEIVE_CATALOG: (state, { payload }) => {
    return Object.assign({}, state, payload, { loading: false });
  },
  REQUEST_CATALOG_FAILED: (state, { payload }) => {
    return Object.assign({}, state, { loading: false });
  }
}, initialState);
