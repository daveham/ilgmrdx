import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Block from 'react-blocks';
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { connectService } from 'redux/modules/service';
import { sendPingCommand } from 'redux/modules/commands';
// import debugLib from 'debug';
// const debug = debugLib('app:Socket');

import styles from './Socket.scss';

export class Socket extends Component {

  static propTypes = {
    connecting: PropTypes.bool,
    socket: PropTypes.object,
    serviceError: PropTypes.string,
    lastSent: PropTypes.string,
    lastReceived: PropTypes.string,
    connect: PropTypes.func.isRequired,
    ping: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.connect();
  }

  handleOnClickPing(event, key) {
    this.props.ping(key);
  }

  renderMessage() {
    const { serviceError, connecting } = this.props;
    const msg = serviceError || (connecting ? 'connecting' : 'connected');
    let msgStyle;
    if (serviceError) {
      msgStyle = 'text-danger';
    } else {
      msgStyle = connecting ? 'text-warning' : 'text-info';
    }
    return <span className={msgStyle}>{msg}</span>;
  }

  render () {
    const { socket, lastSent, lastReceived } = this.props;

    return (
      <Block layout center className={styles.container}>
        <Block>
          <SplitButton title='ping' id='ping-dropdown' bsSize='sm'>
            <MenuItem onSelect={this.handleOnClickPing} eventKey='socket'>socket</MenuItem>
            <MenuItem onSelect={this.handleOnClickPing} eventKey='task'>task</MenuItem>
          </SplitButton>
        </Block>
        <Block centered flex={2}>
          {this.renderMessage()}
        </Block>
        <Block flex={2}>
          <span className='text-muted'>last sent: </span>
          {
            lastSent &&
              <span className='text-info'>{lastSent}</span>
          }
        </Block>
        <Block flex={2}>
          <span className='text-muted'>last received: </span>
          {
            lastReceived &&
              <span className='text-info'>{lastReceived}</span>
          }
        </Block>
        <Block flex={1} className={styles.socketId}>
          <span className='text-muted'>id: </span>
          {
            socket &&
              <span className='text-info'>{socket.id}</span>
          }
        </Block>
      </Block>
    );
  }
}

const stateSelector = state => {
  const { connecting, socket, serviceError, lastSent, lastReceived } = state.service;
  return { connecting, socket, serviceError, lastSent, lastReceived };
};

const dispatchBinder = dispatch => {
  return bindActionCreators({ connect: connectService, ping: sendPingCommand }, dispatch);
};

export default connect(stateSelector, dispatchBinder)(Socket);
