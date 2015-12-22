import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { actions as catalogActions } from '../redux/modules/catalog';
import debugLib from 'debug';
const debug = debugLib('app:CatalogView');

import Catalog from 'components/Catalog';

const mapStateToProps = (state) => ({
  catalog: state.catalog
});
export class CatalogView extends React.Component {
  static propTypes = {
    catalog: React.PropTypes.object.isRequired,
    fetchCatalog: React.PropTypes.func.isRequired
  }

  onOpen () {
    debug('on open handler');
    this.props.fetchCatalog();
  }

  onSelect (id) {
    debug('on select handler', id);
  }

  render () {
    const { catalog } = this.props;
    let busyNotice;
    if (catalog.loading) {
      busyNotice = <div>Busy...</div>;
    } else {
      busyNotice = null;
    }

    return (
      <div className='container text-center'>
        <h1>This is the catalog view!</h1>
        <Catalog
          data={catalog}
          open={this.onOpen.bind(this)}
          select={this.onSelect.bind(this)} />
        {busyNotice}
        <hr />
        <Link to='/'>Back To Home View</Link>
      </div>
    );
  }
}

export default connect(mapStateToProps, catalogActions)(CatalogView);
