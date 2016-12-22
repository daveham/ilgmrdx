import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import debugLib from 'debug';
const debug = debugLib('app:Root');

class Root extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  render () {
    debug('render');
    const { routes, store, history } = this.props;

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} />
        </div>
      </Provider>
    );
  }
}

export default Root;

