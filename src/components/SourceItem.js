import React, { PropTypes } from 'react';
import debugLib from 'debug';
const debug = debugLib('app:SourceItem');

const SourceItem = (props) => {
  const { id, name, select } = props;

  const itemProps = {
    onClick: (event) => {
      event.preventDefault();
      debug('source item clicked', id);
      select(id);
    }
  };

  return <li {...itemProps}>{name}</li>;
};

SourceItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  select: PropTypes.func
};

SourceItem.defaultProps = {
  id: '0',
  name: '',
  select: () => {}
};

export default SourceItem;
