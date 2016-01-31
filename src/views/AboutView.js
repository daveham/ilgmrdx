import React from 'react';
import { Link } from 'react-router';
const debug = require('debug')('app:AboutView');

export class AboutView extends React.Component {

  componentDidMount() {
    this.socket = io.connect('http://localhost:3001/');
    this.socket.on('connect', () => {
      debug('connected');
    });
    this.socket.on('disconnect', () => {
      debug('disconnected');
    });
    this.socket.on('reconnect', () => {
      debug('reconnected');
    });
    this.socket.on('error', err => {
      debug('error', err);
    });
    this.socket.on('my-message-pong', data => {
      debug('pong message', data);
    });
  }

  render () {

    const pingButtonProps = {
      className: 'btn btn-success',
      onClick: event => {
        event.preventDefault();
        debug('sending ping message');
        this.socket.emit('my-message-ping', { data: 'about' });
      }
    };

    return (
      <div className='container text-center'>
        <h1>About</h1>
        <hr />
        <button {...pingButtonProps}>Ping</button>
        <hr />
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

export default AboutView;
