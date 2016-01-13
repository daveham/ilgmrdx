import React, { PropTypes } from 'react';
import styles from './Catalog.scss';
import SourceList from './SourceList';
import debugLib from 'debug';
const debug = debugLib('app:Catalog');

const Catalog = (props) => {
  const { name, sources, sourcesMetadataById, sourcesThumbs, open, select, generate, clear } = props;

  if (name && name.length > 0) {
    return (
      <div className='container text-left'>
        <h2>{name}</h2>
        <div className={styles.catalog}>
          <SourceList
            sources={sources}
            sourcesMetadataById={sourcesMetadataById}
            sourcesThumbs={sourcesThumbs}
            select={select}
            generate={generate}
            clear={clear} />
        </div>
      </div>
    );
  }

  const buttonProps = {
    className: 'btn btn-default',
    onClick: (event) => {
      event.preventDefault();
      debug('open catalog button clicked');
      open();
    }
  };

  return <button {...buttonProps}>Open</button>;
};

Catalog.propTypes = {
  name: PropTypes.string,
  sources: PropTypes.array,
  sourcesMetadataById: PropTypes.object,
  sourcesThumbs: PropTypes.object,
  open: PropTypes.func,
  select: PropTypes.func,
  generate: PropTypes.func,
  clear: PropTypes.func
};

Catalog.defaultProps = {
  name: '',
  sources: [],
  sourcesMetadataById: {},
  sourcesThumbs: {},
  open: () => {},
  select: () => {},
  generate: () => {},
  clear: () => {}
};

export default Catalog;
