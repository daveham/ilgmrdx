import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import MainToolbar from 'components/MainToolbar';

import { actions as catalogActions } from 'redux/modules/catalog';
import { actions as sourceMetadataActions } from 'redux/modules/sources-metadata';
import { actions as sourceThumbsActions } from 'redux/modules/sources-thumbs';
import Catalog from 'components/Catalog';
import Busy from 'components/Busy';

import debugLib from 'debug';
const debug = debugLib('app:CatalogView');

const actions = Object.assign(
  {},
  catalogActions,
  sourceMetadataActions,
  sourceThumbsActions
);

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
      <div className='container text-center'>
        <MainToolbar page='catalog' />
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
      </div>
    );
  }
}

// selectors
const catalog = state => state.catalog;
const sourcesById = createSelector(
  state => state.catalog.sources,
  sources => {
    debug('reselector for sources', sources);
    const byId = {};
    if (sources) {
      sources.forEach(source => byId[source.id] = source);
    }
    return byId;
  }
);
const stateSelector = createStructuredSelector({
  catalog,
  sourcesById
});

export default connect(stateSelector, actions)(CatalogView);
