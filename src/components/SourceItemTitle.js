import React, { Component, PropTypes } from 'react';
import styles from './SourceItemTitle.scss';

class SourceItemTitle extends Component {
  static get propTypes() {
    return {
      name: PropTypes.string,
      expanded: PropTypes.bool,
      toggle: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      name: '',
      expanded: false,
      toggle: () => {}
    };
  }

  render() {
    const itemProps = {
      className: styles.item,
      onClick: event => {
        event.preventDefault();
        this.props.toggle();
      }
    };

    const label = `${this.props.expanded ? '-' : '+'} ${this.props.name}`;

    return <div {...itemProps}>{label}</div>;
  }
};

export default SourceItemTitle;
