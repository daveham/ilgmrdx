import React, { PropTypes } from 'react';
import Busy from './Busy';
import styles from './SourceImage.scss';

const SourceImage = (props) => {
  const { id, thumb, thumbsLoading, generate } = props;
  if (thumbsLoading || thumb === 'busy') {
    return <Busy />;
  } else {
    if (thumb === 'ready') {
      const src = `/thumbs/${id}_thumb.jpg`;
      return <img className={styles.thumb} src={src} />;
    } else {
      const genButtonProps = {
        className: 'btn btn-success',
        onClick: event => {
          event.preventDefault();
          generate(id);
        }
      };
      return <button {...genButtonProps}>Generate</button>;
    }
  }
};

SourceImage.propTypes = {
  id: PropTypes.string,
  thumb: PropTypes.string,
  thumbsLoading: PropTypes.bool,
  generate: PropTypes.func
};

SourceImage.defaultProps = {
  thumbsLoading: false,
  generate: () => {}
};

export default SourceImage;
