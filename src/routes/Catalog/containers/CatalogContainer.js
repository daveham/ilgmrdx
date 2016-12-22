import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { increment, doubleAsync } from '../modules/catalog';

import Catalog from '../components/Catalog.js';

const mapDispatchToProps = {
  increment: () => increment(1),
  doubleAsync
};

const catalogSelector = state => state.catalog;
const mapStateToProps = createStructuredSelector({
  catalog: catalogSelector
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
