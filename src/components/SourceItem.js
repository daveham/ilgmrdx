import React, { Component, PropTypes } from 'react';
import Busy from './Busy';
import SourceItemTitle from './SourceItemTitle';
import SourceItemDetails from './SourceItemDetails';
import SourceImage from './SourceImage';
import styles from './SourceItem.scss';

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

    const loaded = metadata && metadata.loading === false && metadata.status && metadata.status.length > 0;

    let details = null;
    const { expanded } = this.state;
    if (expanded) {
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
          clear={(id) => {
            this.setState({ expanded: false });
            clear(id);
          }} />;
      }
    }

    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'>
              <SourceImage
                id={id}
                thumb={thumb}
                thumbsLoading={thumbsLoading}
                generate={generate} />
            </div>
            <div className={'col-md-10 ' + styles.container}>
              <div className={styles.item}>
                <SourceItemTitle
                  name={name}
                  expanded={expanded}
                  toggle={() => {
                    if (!metadata.loading) {
                      if (!(expanded || loaded)) {
                        select(id);
                      }
                      this.setState({ expanded: !expanded });
                    }
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
