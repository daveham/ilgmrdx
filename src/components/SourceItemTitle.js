import React, { Component, PropTypes } from 'react';
import Block from 'react-blocks';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import styles from './SourceItemTitle.scss';

class SourceItemTitle extends Component {
  static get propTypes() {
    return {
      name: PropTypes.string,
      expanded: PropTypes.bool,
      toggle: PropTypes.func,
      children: PropTypes.node
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
      className: styles.container,
      layout: true,
      onClick: event => {
        event.preventDefault();
        this.props.toggle();
      }
    };

    return (
      <Block {...itemProps}>
        <Block className={styles.icon}>
          <Glyphicon glyph={this.props.expanded ? 'minus-sign' : 'plus-sign'}/>
        </Block>
        <Block className={styles.title} flex>
          {this.props.name}
        </Block>
        <Block className={styles.loading}>
          {this.props.children}
        </Block>
      </Block>
    );
  }
};

export default SourceItemTitle;
