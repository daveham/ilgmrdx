import React, { PropTypes } from 'react';
import Busy from './Busy';
import SourceItemDetails from './SourceItemDetails';
import styles from './SourceItem.scss';
import debugLib from 'debug';
const debug = debugLib('app:SourceItem');

const SourceItem = (props) => {
  const { id, name, thumb, thumbsLoading, select, generate, clear, metadata } = props;

  const loaded = metadata && !metadata.loading && metadata.status;

  const itemProps = {
    className: loaded ? styles.itemloaded : styles.item
  };

  if (!loaded) {
    itemProps.onClick = event => {
      event.preventDefault();
      debug('source item clicked', id);
      select(id);
    };
  }

  let image = null;
  if (thumbsLoading || thumb === 'busy') {
    image = <Busy busy />;
  } else {
    if (thumb === 'ready') {
      const src = `/${id}_thumb.jpg`;
      image = <img className={styles.thumb} src={src} />;
    } else {
      const genButtonProps = {
        className: 'btn btn-success',
        onClick: event => {
          event.preventDefault();
          debug('generate button clicked');
          generate(id);
        }
      };
      image = <button {...genButtonProps}>Generate</button>;
    }
  }

  return (
    <div {...itemProps}>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            {image}
          </div>
          <div className={'col-md-10 ' + styles.container}>
            {name}
            <SourceItemDetails
              id={id}
              loading={metadata.loading}
              error = {metadata.error}
              filename = {metadata.filename}
              status = {metadata.status}
              size = {metadata.size}
              ctime = {metadata.ctime}
              format = {metadata.format}
              width = {metadata.width}
              height = {metadata.height}
              depth = {metadata.depth}
              filesize = {metadata.filesize}
              resolution = {metadata.resolution}
              clear={clear} />
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
