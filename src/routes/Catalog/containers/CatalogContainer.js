import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';

import { actions as catalogActions } from '../modules/catalog';
import { actions as sourceMetadataActions } from '../modules/sources-metadata';
import { actions as sourceThumbsActions } from '../modules/sources-thumbs';
import CatalogView from '../components/CatalogView.js';

const mapDispatchToProps = Object.assign(
  {},
  catalogActions,
  sourceMetadataActions,
  sourceThumbsActions
);

// selectors
const catalog = state => state.catalog;
const sourcesById = createSelector(
  state => state.catalog.sources,
  sources => {
    const byId = {};
    if (sources) {
      sources.forEach((source) => { byId[source.id] = source; });
    }
    return byId;
  }
);
const mapStateToProps = createStructuredSelector({
  catalog,
  sourcesById
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogView);
