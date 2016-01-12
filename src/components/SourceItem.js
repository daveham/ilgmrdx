import React, { PropTypes } from 'react';
import styles from './SourceItem.scss';
import debugLib from 'debug';
const debug = debugLib('app:SourceItem');

const SourceItem = (props) => {
  const { id, name, thumb, thumbsLoading, select, generate, clear, metadata } = props;

  const loaded = metadata && !metadata.loading && metadata.status;

  const itemProps = {
    className: loaded ? styles.itemloaded : styles.item
  };

  let button = null;

  if (loaded) {
    const buttonProps = {
      className: 'btn btn-default',
      onClick: event => {
        event.preventDefault();
        debug('clear button clicked');
        clear(id);
      }
    };
    button = <button {...buttonProps}>Clear</button>;
  } else {
    itemProps.onClick = event => {
      event.preventDefault();
      debug('source item clicked', id);
      select(id);
    };
  }

  let image = null;
  if (thumbsLoading || thumb === 'busy') {
    image = <img src='/genbusy.gif' />;
  } else {
    if (thumb === 'ready') {
      const src = `/${id}_thumb.jpg`;
      image = <img src={src} />;
    } else {
      const genButtonProps = {
        className: 'btn btn-default',
        onClick: event => {
          event.preventDefault();
          debug('generate button clicked');
          generate(id);
        }
      };
      image = <button {...genButtonProps}>Generate</button>;
    }
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
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            {name}
          </div>
        </div>
        <div className='row'>
          <div className='col-md-2'>
            {image}
          </div>
          <div className='col-md-10'>
            {details}
          </div>
        </div>
      </div>
    </div>
  );
};

SourceItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  thumb: PropTypes.string,
  thumbsLoading: PropTypes.bool,
  metadata: PropTypes.object,
  select: PropTypes.func,
  generate: PropTypes.func,
  clear: PropTypes.func
};

SourceItem.defaultProps = {
  id: '0',
  name: '',
  metadata: {},
  thumb: null,
  thumbsLoading: false,
  select: () => {},
  generate: () => {},
  clear: () => {}
};

export default SourceItem;
