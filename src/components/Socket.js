import React, { Component, PropTypes } from 'react';
import Block from 'react-blocks';
import FontIcon from 'material-ui/lib/font-icon';
import IconButton from 'material-ui/lib/icon-button';
import Colors from 'material-ui/lib/styles/colors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

  render () {
    const msg = this.props.serviceError || (this.props.connecting ? 'connecting' : 'connected');
    const id = this.props.socket ? `id: ${this.props.socket.id}` : '';

    return (
      <Block layout center className={styles.container}>
        <Block>
          <IconButton tooltip='ping' iconStyle={{ fontSize: '20px' }} tooltipPosition={'top-right'} onClick={this.handleOnClickPing.bind(this)}>
            <FontIcon className='material-icons' color={Colors.blue500}>wifi_tethering</FontIcon>
          </IconButton>
        </Block>
        <Block className={styles.status}>
          {msg}
        </Block>
        <Block flex={2}>
          last sent: {this.props.lastSent}
        </Block>
        <Block flex={2}>
          last received: {this.props.lastReceived}
        </Block>
        <Block flex={1} className={styles.socketId}>
          {id}
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
