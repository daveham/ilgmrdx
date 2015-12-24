import React, { PropTypes } from 'react';

const Busy = (props) => {
  let busyNotice;
  if (props.busy) {
    busyNotice = <div>Busy...</div>;
  } else {
    busyNotice = <span/>;
  }
  return busyNotice;
};

Busy.propTypes = {
  busy: PropTypes.bool
};

Busy.defaultProps = {
  busy: false
};

export default Busy;
