import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Block from 'react-blocks';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { connectService } from 'redux/modules/service';
import { sendPingCommand } from 'redux/modules/commands';

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

  handleOnClickPing(event) {
    event.preventDefault();
    this.props.ping({ data: 'socket component' });
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
          <Button block onClick={this.handleOnClickPing.bind(this)}>
            <Glyphicon glyph='bullhorn'/>
          </Button>
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
