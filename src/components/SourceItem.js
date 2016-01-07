import React, { PropTypes } from 'react';
import styles from './SourceItem.scss';
import debugLib from 'debug';
const debug = debugLib('app:SourceItem');

const SourceItem = (props) => {
  const { id, name, select, clear, metadata } = props;

  const loaded = metadata && !metadata.loading && metadata.status;

  const itemProps = {
    className: loaded ? styles.itemloaded : styles.item
  };

  let button = null;

  if (loaded) {
    const buttonProps = {
      className: 'btn btn-default',
      onClick: (event) => {
        event.preventDefault();
        debug('clear button clicked');
        clear(id);
      }
    };
    button = <button {...buttonProps}>Clear</button>;
  } else {
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
      if (metadata.error) {
        details = (
          <dl className={'dl-horizontal ' + styles.detail}>
            <dt>file</dt><dd>{metadata.filename}</dd>
            <dt>status</dt><dd>File Error</dd>
          </dl>
        );
      } else {
        details = (
          <div>
            {button}
            <dl className={'dl-horizontal ' + styles.detail}>
              <dt>file</dt><dd>{metadata.filename}</dd>
              <dt>status</dt><dd>{metadata.status}</dd>
              <dt>size</dt><dd>{metadata.size}</dd>
              <dt>created</dt><dd>{metadata.ctime}</dd>
              <dt>format</dt><dd>{metadata.format}</dd>
              <dt>dimensions</dt><dd>{metadata.width} x {metadata.height} x {metadata.depth}</dd>
              <dt>file size</dt><dd>{metadata.filesize}</dd>
              <dt>resolution</dt><dd>{metadata.resolution}</dd>
            </dl>
          </div>
        );
      }
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
  select: PropTypes.func,
  clear: PropTypes.func
};

SourceItem.defaultProps = {
  id: '0',
  name: '',
  metadata: {},
  select: () => {},
  clear: () => {}
};

export default SourceItem;
