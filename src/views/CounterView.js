import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
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
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Counter</h1>
        <h2>
          Sample Counter:&nbsp;
          <span className={styles['counter--green']}>{this.props.counter}</span>
        </h2>
        <button className='btn btn-default'
                onClick={() => this.props.increment(1)}>
          Increment
        </button>
        <button className='btn btn-default'
                onClick={this.props.doubleAsync}>
          Double (Async)
        </button>
        <hr />
        <Link to='/'>Home</Link>
      </div>
    );
  }
}

const counterSelector = state => state.counter;
const stateSelector = createStructuredSelector({
  counter: counterSelector
});

export default connect(stateSelector, counterActions)(CounterView);
