import React, { PropTypes } from 'react';
import SourceItem from './SourceItem';

const SourceList = (props) => {
  const { sources, sourcesMetadataById, select, clear } = props;
  return (
    <div>
      { sources.map(source => {
        return <SourceItem
          key={source.id}
          id={source.id}
          name={source.name}
          metadata={sourcesMetadataById[source.id]}
          select={select}
          clear={clear} />;
      })}
    </div>
  );
};

SourceList.propTypes = {
  sources: PropTypes.array,
  sourcesMetadataById: PropTypes.object,
  select: PropTypes.func,
  clear: PropTypes.func
};

SourceList.defaultProps = {
  sources: [],
  sourcesMetadataById: {},
  select: () => {},
  clear: () => {}
};

export default SourceList;
