import React, { Component, PropTypes } from 'react';
import Block from 'react-blocks';
import Panel from 'react-bootstrap/lib/Panel';
import Busy from './Busy';
import SourceItemTitle from './SourceItemTitle';
import SourceItemDetails from './SourceItemDetails';
import SourceImage from './SourceImage';

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
    const { expanded } = this.state;

    const busy = metadata && metadata.loading;
    const loaded = metadata && metadata.loading === false && metadata.status && metadata.status.length > 0;

    const title = (
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
        }}
      >
        <Busy busy={busy}/>
      </SourceItemTitle>
    );

    let content = null;
    if (expanded) {
      const image = <SourceImage
        id={id}
        thumb={thumb}
        thumbsLoading={thumbsLoading}
        generate={generate}
      />;

      let details = null;
      if (!metadata.loading) {
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
          }}
        />;
      }

      content = (
        <Block layout>
          <Block>{image}</Block>
          <Block flex>{details}</Block>
        </Block>
      );
    }

    return (
      <Panel header={title} collapsible expanded={this.state.expanded}>
        {content}
      </Panel>
    );
  }
};

export default SourceItem;
