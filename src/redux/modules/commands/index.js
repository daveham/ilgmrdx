import { receiveServiceMessage, sendServiceCommand } from '../service';
import _debug from 'debug';
const debug = _debug('app:redux:service:commands');

export const configureCommandHandlers = (socket, dispatch) => {

  const pong = 'my-message-pong';
  socket.on(pong, payload => {
    debug(pong, payload);
    dispatch(receiveServiceMessage({ message: pong, payload }));
  });

};

export const sendPingCommand = payload => {
  const ping = 'my-message-ping';
  return sendServiceCommand(ping, payload);
};
