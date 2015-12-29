import React, { PropTypes } from 'react';
import SourceItem from './SourceItem';

const SourceList = (props) => {
  const { sources, sourcesMetadataById, select } = props;
  return (
    <div>
      { sources.map(source => {
        return <SourceItem
          key={source.id}
          id={source.id}
          name={source.name}
          metadata={sourcesMetadataById[source.id]}
          select={select} />;
      })}
    </div>
  );
};

SourceList.propTypes = {
  sources: PropTypes.array,
  sourcesMetadataById: PropTypes.object,
  select: PropTypes.func
};

SourceList.defaultProps = {
  sources: [],
  sourcesMetadataById: {},
  select: () => {}
};

export default SourceList;
