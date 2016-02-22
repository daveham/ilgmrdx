import { createAction } from 'redux-actions';
import _debug from 'debug';
const debug = _debug('app:redux:service');

import { configureCommandHandlers } from './commands';

const SERVICE_CONNECT = 'SERVICE_CONNECT';
const SERVICE_CONNECTED = 'SERVICE_CONNECTED';
const SERVICE_FAILED = 'SERVICE_FAILED';
const SEND_SERVICE_MESSAGE = 'SEND_SERVICE_MESSAGE';
const RECEIVE_SERVICE_MESSAGE = 'RECEIVE_SERVICE_MESSAGE';

// actions
const requestServiceConnect = createAction(SERVICE_CONNECT);
const receiveServiceConntected = createAction(SERVICE_CONNECTED);
const serviceFailed = createAction(SERVICE_FAILED);
export const connectService = () => {
  return (dispatch, getState) => {
    // TODO: make this return a promise
    dispatch(requestServiceConnect());
    if (typeof io === 'undefined') {
      debug('io not defined, service probably not running');
      dispatch(serviceFailed());
      return;
    }

    const socket = io.connect('http://localhost:3001/');
    socket.on('connect', () => {
      debug('connected');
      dispatch(receiveServiceConntected({ socket }));
    });
    socket.on('disconnect', () => {
      debug('disconnected');
    });
    socket.on('reconnect', () => {
      debug('reconnected');
    });
    socket.on('error', err => {
      debug('error', err);
    });
    configureCommandHandlers(socket, dispatch);
  };
};

const sendServiceMessage = createAction(SEND_SERVICE_MESSAGE);
export const receiveServiceMessage = createAction(RECEIVE_SERVICE_MESSAGE);
export const sendServiceCommand = (message, data) => {
  return (dispatch, getState) => {
    debug('sendServiceCommand', message, data);

    switch (message) {
      case 'il-ping':
        // in 'socket' mode, ping the task server directly
        if (data === 'socket') {
          const { socket } = getState().service;
          socket.emit(message, data);
          dispatch(sendServiceMessage({ message }));
        } else {
          debug('task ping');

          const body = JSON.stringify({ category: data });
          const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          };
          return fetch('/api/ping', { method: 'POST', body, headers })
            .then(() => {
              dispatch(sendServiceMessage({ message }));
            })
            .catch(reason => {
              debug('ping task error', reason);
            });
        }
        break;

      default:
        debug('unsupported command', message);
    }
  };
};

// reducers
export default (state = {}, action) => {
  switch (action.type) {
    case SERVICE_CONNECT:
      return Object.assign({}, state, { connecting: true });
    case SERVICE_CONNECTED:
      return Object.assign({}, state, { connecting: false, socket: action.payload.socket });
    case SERVICE_FAILED:
      return Object.assign({}, state, { connecting: false, serviceError: 'service not available' });
    case SEND_SERVICE_MESSAGE:
      return Object.assign({}, state, { lastSent: action.payload.message });
    case RECEIVE_SERVICE_MESSAGE:
      return Object.assign({}, state, { lastReceived: `${action.payload.message}/${action.payload.data.status}` });
    default:
      return state;
  }
};
