import React, { PropTypes } from 'react';
import SourceItem from './SourceItem';

const SourceList = (props) => {
  const { sources, select } = props;
  return (
    <ul>
      { sources.map(source => {
        return <SourceItem key={source.id} id={source.id} name={source.name} select={select} />;
      })}
    </ul>
  );
};

SourceList.propTypes = {
  sources: PropTypes.array,
  select: PropTypes.func
};

SourceList.defaultProps = {
  sources: [],
  select: () => {}
};

export default SourceList;
