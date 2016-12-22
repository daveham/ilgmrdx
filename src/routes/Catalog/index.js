import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'catalog',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Catalog = require('./containers/CatalogContainer').default;
      const reducer = require('./modules/catalog').default;

      injectReducer(store, { key: 'catalog', reducer });

      cb(null, Catalog);
    }, 'catalog');
  }
});
