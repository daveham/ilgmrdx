import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Well from 'react-bootstrap/lib/Well';

import { actions as counterActions } from 'redux/modules/counter';

import styles from './CounterView.scss';

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class CounterView extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
  };

  render () {
    return (
      <div className={styles.container}>
        <Well>
          <h1>
            Sample Counter:&nbsp;
            <span className='text-success'>{this.props.counter}</span>
          </h1>
          <ButtonGroup>
            <Button onClick={() => this.props.increment(1)}>Increment</Button>
            <Button onClick={this.props.doubleAsync}>Double (Async)</Button>
          </ButtonGroup>
        </Well>
      </div>
    );
  }
}

const counterSelector = state => state.counter;
const stateSelector = createStructuredSelector({
  counter: counterSelector
});

export default connect(stateSelector, counterActions)(CounterView);
