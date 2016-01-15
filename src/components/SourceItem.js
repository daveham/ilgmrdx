import React, { Component, PropTypes } from 'react';
import Busy from './Busy';
import SourceItemTitle from './SourceItemTitle';
import SourceItemDetails from './SourceItemDetails';
import styles from './SourceItem.scss';
import debugLib from 'debug';
const debug = debugLib('app:SourceItem');

class SourceItem extends Component {
  static get propTypes() {
    return {
      id: PropTypes.string,
      name: PropTypes.string,
      thumb: PropTypes.string,
      thumbsLoading: PropTypes.bool,
      metadata: PropTypes.object,
      select: PropTypes.func,
      generate: PropTypes.func,
      clear: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      id: '0',
      name: '',
      metadata: {},
      thumb: null,
      thumbsLoading: false,
      select: () => {},
      generate: () => {},
      clear: () => {}
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  render() {
    const { id, name, thumb, thumbsLoading, select, generate, clear, metadata } = this.props;

    const loaded = metadata && !metadata.loading && metadata.status;

    let image = null;
    if (thumbsLoading || thumb === 'busy') {
      image = <Busy />;
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

    let details = null;
    if (this.state.expanded) {
      if (metadata.loading) {
        details = <Busy />;
      } else {
        details = <SourceItemDetails
          id={id}
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
          clear={clear} />;
      }
    }

    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'>
              {image}
            </div>
            <div className={'col-md-10 ' + styles.container}>
              <div className={styles.item}>
                <SourceItemTitle
                  name={name}
                  expand={expanded => {
                    debug('onExpanded', expanded);
                    if (expanded && !loaded) {
                      select(id);
                    }
                    this.setState({ expanded });
                  }} />
              </div>
              {details}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SourceItem;
