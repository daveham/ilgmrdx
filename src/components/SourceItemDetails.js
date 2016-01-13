import React, { PropTypes } from 'react';
import Busy from './Busy';
import SourceItemDetailsClearButton from './SourceItemDetailsClearButton';
import styles from './SourceItemDetails.scss';

const SourceItemDetails = (props) => {

  const loaded = !props.loading && props.status;

  let button = null;
  if (loaded) {
    button = <SourceItemDetailsClearButton id={props.id} clear={props.clear} />;
  }

  let containerClassname;
  let details = null;
  if (props.loading) {
    containerClassname = styles.containerbusy;
    details = <Busy />;
  } else {
    containerClassname = styles.container;
    if (loaded) {
      if (props.error) {
        details = (
          <dl className={'dl-horizontal'}>
            <dt>file</dt><dd>{props.filename}</dd>
            <dt>status</dt><dd className={styles.dataerror}>File Error</dd>
          </dl>
        );
      } else {
        details = (
          <dl className={'dl-horizontal'}>
            <dt>file</dt><dd>{props.filename}</dd>
            <dt>status</dt><dd>{props.status}</dd>
            <dt>size</dt><dd>{props.size}</dd>
            <dt>created</dt><dd>{props.ctime}</dd>
            <dt>format</dt><dd>{props.format}</dd>
            <dt>dimensions</dt><dd>{props.width} x {props.height} x {props.depth}</dd>
            <dt>file size</dt><dd>{props.filesize}</dd>
            <dt>resolution</dt><dd>{props.resolution}</dd>
          </dl>
        );
      }
    }
  }

  return (
    <div className={containerClassname}>
      {details}
      {button}
    </div>
  );
};

SourceItemDetails.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  filename: PropTypes.string,
  status: PropTypes.string,
  size: PropTypes.string,
  ctime: PropTypes.string,
  format: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  depth: PropTypes.string,
  filesize: PropTypes.string,
  resolution: PropTypes.string,
  clear: PropTypes.func
};

SourceItemDetails.defaultProps = {
  loading: false,
  clear: () => {}
};

export default SourceItemDetails;
