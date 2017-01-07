import React, { Component, PropTypes } from 'react';

import Catalog from './Catalog';
import Busy from './Busy';

import debugLib from 'debug';
const debug = debugLib('app:CatalogView');

import styles from './CatalogView.scss';

const sourcePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
});

export class CatalogView extends Component {
  static propTypes = {
    catalog: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      sources: PropTypes.arrayOf(sourcePropType).isRequired,
      sourcesMetadata: PropTypes.object,
      sourcesThumbs: PropTypes.object
    }).isRequired,
    sourcesById: PropTypes.object.isRequired,
    fetchCatalog: PropTypes.func.isRequired,
    fetchSourceMetadata: PropTypes.func.isRequired,
    deleteSourceMetadata: PropTypes.func.isRequired,
    fetchSourceThumbs: PropTypes.func.isRequired,
    generateSourceThumb: PropTypes.func.isRequired
  };

  componentDidMount() {
    setTimeout(this.onOpen.bind(this), 100);
  }

  onOpen () {
    this.props.fetchCatalog();
    this.props.fetchSourceThumbs();
  }

  onSelect (id) {
    debug('onSelect', id);
    const item = this.props.catalog.sourcesMetadata[id];
    if (item === undefined) {
      this.props.fetchSourceMetadata(id);
    }
  }

  onClear(id) {
    debug('onClear', id);
    this.props.deleteSourceMetadata(id);
  }

  onGenerate(id) {
    debug('onGenerate', id);
    this.props.generateSourceThumb(id, this.props.sourcesById[id].file);
  }

  render () {
    const { catalog } = this.props;
    const { name, loading, sources, sourcesMetadata, sourcesThumbs } = catalog;

    return (
      <div className={styles.container}>
        <Catalog
          name={name}
          loading={loading}
          sources={sources}
          sourcesMetadataById={sourcesMetadata}
          sourcesThumbs={sourcesThumbs}
          select={this.onSelect.bind(this)}
          generate={this.onGenerate.bind(this)}
          clear={this.onClear.bind(this)} />
        <Busy busy={catalog.loading} />
      </div>
    );
  }
}

export default CatalogView;
