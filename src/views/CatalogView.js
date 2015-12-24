import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { actions as catalogActions } from 'redux/modules/catalog';
import Catalog from 'components/Catalog';
import Busy from 'components/Busy';

import debugLib from 'debug';
const debug = debugLib('app:CatalogView');

export class CatalogView extends Component {
  static propTypes = {
    catalog: PropTypes.object.isRequired,
    fetchCatalog: PropTypes.func.isRequired
  }

  onOpen () {
    debug('onOpen');
    this.props.fetchCatalog();
  }

  onSelect (id) {
    debug('onSelect', id);
  }

  render () {
    const { catalog } = this.props;

    return (
      <div className='container text-center'>
        <h1>This is the catalog view!</h1>
        <Catalog
          data={catalog}
          open={this.onOpen.bind(this)}
          select={this.onSelect.bind(this)} />
        <Busy busy={catalog.loading} />
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

// selectors
const catalogSelector = state => state.catalog;
const stateSelector = createStructuredSelector({
  catalog: catalogSelector
});

export default connect(stateSelector, catalogActions)(CatalogView);
