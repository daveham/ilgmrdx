import React, { PropTypes } from 'react';
import styles from './Catalog.scss';

const Busy = (props) => {
  let busyNotice;
  if (props.busy) {
    busyNotice = <span style={styles.busy}>{props.text}</span>;
  } else {
    busyNotice = <span/>;
  }
  return busyNotice;
};

Busy.propTypes = {
  busy: PropTypes.bool,
  text: PropTypes.string
};

Busy.defaultProps = {
  busy: true,
  text: 'loading...'
};

export default Busy;
