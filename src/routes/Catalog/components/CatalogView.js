import React, { Component, PropTypes } from 'react';
import Well from 'react-bootstrap/lib/Well';

import Catalog from './Catalog';
import Busy from './Busy';

import debugLib from 'debug';
const debug = debugLib('app:CatalogView');

import styles from './CatalogView.scss';

export class CatalogView extends Component {
  static propTypes = {
    catalog: PropTypes.object.isRequired,
    sourcesById: PropTypes.object.isRequired,
    fetchCatalog: PropTypes.func.isRequired,
    fetchSourceMetadata: PropTypes.func.isRequired,
    deleteSourceMetadata: PropTypes.func.isRequired,
    fetchSourceThumbs: PropTypes.func.isRequired,
    generateSourceThumb: PropTypes.func.isRequired
  };

  onOpen () {
    debug('onOpen');
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
        <Well>
          <Catalog
            name={name}
            loading={loading}
            sources={sources}
            sourcesMetadataById={sourcesMetadata}
            sourcesThumbs={sourcesThumbs}
            open={this.onOpen.bind(this)}
            select={this.onSelect.bind(this)}
            generate={this.onGenerate.bind(this)}
            clear={this.onClear.bind(this)} />
          <Busy busy={catalog.loading} />
        </Well>
      </div>
    );
  }
}

export default CatalogView;
