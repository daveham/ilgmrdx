import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { connectService } from 'redux/modules/service';
import { sendPingCommand } from 'redux/modules/commands';

export class Socket extends Component {

  static propTypes = {
    connecting: PropTypes.bool,
    socket: PropTypes.object,
    lastSent: PropTypes.string,
    lastReceived: PropTypes.string,
    connect: PropTypes.func.isRequired,
    ping: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.connect();
  }

  render () {
    const pingButtonProps = {
      className: 'btn btn-success',
      onClick: event => {
        event.preventDefault();
        this.props.ping({ data: 'socket component' });
      }
    };

    const msg = this.props.connecting ? 'connecting' : 'connected';
    const id = this.props.socket ? `id: ${this.props.socket.id}` : '';

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <button {...pingButtonProps}>Ping</button>
          </div>
          <div className='col-md-2'>
            {msg}
          </div>
          <div className='col-md-3'>
            last sent: {this.props.lastSent}
          </div>
          <div className='col-md-3'>
            last received: {this.props.lastReceived}
          </div>
          <div className='col-md-2'>
            {id}
          </div>
        </div>
      </div>
    );
  }
}

const stateSelector = state => {
  const { connecting, socket, lastSent, lastReceived } = state.service;
  return { connecting, socket, lastSent, lastReceived };
};

const dispatchBinder = dispatch => {
  return bindActionCreators({ connect: connectService, ping: sendPingCommand }, dispatch);
};

export default connect(stateSelector, dispatchBinder)(Socket);
