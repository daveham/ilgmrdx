import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { actions as catalogActions } from 'redux/modules/catalog';
import { actions as sourceMetadataActions } from 'redux/modules/sources-metadata';
import Catalog from 'components/Catalog';
import Busy from 'components/Busy';

import debugLib from 'debug';
const debug = debugLib('app:CatalogView');

export class CatalogView extends Component {
  static propTypes = {
    catalog: PropTypes.object.isRequired,
    sourcesById: PropTypes.object.isRequired,
    fetchCatalog: PropTypes.func.isRequired,
    fetchSourceMetadata: PropTypes.func.isRequired,
    deleteSourceMetadata: PropTypes.func.isRequired
  }

  onOpen () {
    debug('onOpen');
    this.props.fetchCatalog();
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

  render () {
    const { catalog } = this.props;
    const { name, loading, sources, sourcesMetadata } = catalog;

    return (
      <div className='container text-center'>
        <h1>This is the catalog view!</h1>
        <Catalog
          name={name}
          loading={loading}
          sources={sources}
          sourcesMetadataById={sourcesMetadata}
          open={this.onOpen.bind(this)}
          select={this.onSelect.bind(this)}
          clear={this.onClear.bind(this)} />
        <Busy busy={catalog.loading} />
        <hr />
        <Link to='/'>Back To Home View</Link>
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

export default connect(stateSelector, Object.assign({}, catalogActions, sourceMetadataActions))(CatalogView);
