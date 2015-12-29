import React, { PropTypes } from 'react';
import styles from './SourceItem.scss';
import debugLib from 'debug';
const debug = debugLib('app:SourceItem');

const SourceItem = (props) => {
  const { id, name, select, metadata } = props;

  const loaded = metadata && !metadata.loading && metadata.size;

  const itemProps = {
    className: loaded ? styles.itemloaded : styles.item
  };
  if (!loaded) {
    itemProps.onClick = (event) => {
      event.preventDefault();
      debug('source item clicked', id);
      select(id);
    };
  }

  let details;
  if (metadata.loading) {
    details = <div className={styles.detail}>loading...</div>;
  } else {
    if (loaded) {
      details = <div className={styles.detail}>size: {metadata.size}</div>;
    } else {
      details = null;
    }
  }

  return (
    <div {...itemProps}>
      {name}<br />
      {details}
    </div>
  );
};

SourceItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  metadata: PropTypes.object,
  select: PropTypes.func
};

SourceItem.defaultProps = {
  id: '0',
  name: '',
  metadata: {},
  select: () => {}
};

export default SourceItem;
