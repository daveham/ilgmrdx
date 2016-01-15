import React, { Component, PropTypes } from 'react';
import styles from './SourceItemTitle.scss';

class SourceItemTitle extends Component {
  static get propTypes() {
    return {
      name: PropTypes.string,
      expand: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      name: '',
      expand: () => {}
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  render() {
    const itemProps = {
      className: styles.item,
      onClick: event => {
        event.preventDefault();
        const expanded = !this.state.expanded;
        this.setState({ expanded });
        this.props.expand(expanded);
      }
    };

    const label = `${this.state.expanded ? '-' : '+'} ${this.props.name}`;

    return <div {...itemProps}>{label}</div>;
  }
};

export default SourceItemTitle;
