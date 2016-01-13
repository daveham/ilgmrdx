import React, { PropTypes } from 'react';

const SourceItemDetailsClearButton = (props) => {

  return <button
    className='btn btn-success'
    onClick={
      event => {
        event.preventDefault();
        props.clear(props.id);
      }
    }>Clear</button>;
};

SourceItemDetailsClearButton.propTypes = {
  id: PropTypes.string,
  clear: PropTypes.func
};

SourceItemDetailsClearButton.defaultProps = {
  clear: () => {}
};

export default SourceItemDetailsClearButton;
