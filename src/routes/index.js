import CoreLayout from 'layouts/CoreLayout';
import HomeRoute from './Home';
import AboutRoute from './About';
import CounterRoute from './Counter';
import CatalogRoute from './Catalog';

import debugLib from 'debug';
const debug = debugLib('app:routes');

export const createRoutes = (store) => {
  debug('createRoutes');
  return ({
    path: '/',
    component: CoreLayout,
    indexRoute: HomeRoute,
    childRoutes: [
      AboutRoute,
      CounterRoute(store),
      CatalogRoute(store)
    ]
  });
};

export default createRoutes;
