import { combineReducers } from 'redux';
import { createAction /*,
         handleActions */ } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import { REQUEST_CATALOG, RECEIVE_CATALOG, REQUEST_CATALOG_FAILED } from './constants';
import sources from './sources';
import sourcesMetadata from './sources-metadata';
import sourcesThumbs from './sources-thumbs';
import debugLib from 'debug';
const debug = debugLib('app:redux:catalog');

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

const loading = (state, action) => {
  // debug('loading reducer, action:', action);
  switch (action.type) {
    case REQUEST_CATALOG:
      return true;
    default:
      return false;
  }
};

const name = (state = '', action) => {
  // debug('name reducer, action:', action);
  switch (action.type) {
    case RECEIVE_CATALOG:
      return action.payload.name;
    default:
      return state;
  }
};

export default combineReducers({
  loading,
  name,
  sources,
  sourcesMetadata,
  sourcesThumbs
});

// const initialState = {
//   name: null,
//   loading: false,
//   sources: [],
//   sourcesMetadata: []
// };

// reducer
// export default handleActions({
//   REQUEST_CATALOG: (state, { payload }) => {
//     return Object.assign({}, state, {
//       loading: true
//     });
//   },
//   RECEIVE_CATALOG: (state, { payload }) => {
//     return Object.assign({}, state, {
//       loading: false,
//       name: payload.name,
//       sources: sources(payload.sources),
//       sourcesMetadata: sourcesMetadata(payload.sourcesMetadata)
//     });
//   },
//   REQUEST_CATALOG_FAILED: (state, { payload }) => {
//     return Object.assign({}, state, {
//       loading: false
//     });
//   }
// }, initialState);
