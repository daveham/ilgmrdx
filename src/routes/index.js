import CoreLayout from 'layouts/CoreLayout';
import HomeRoute from './Home';
import AboutRoute from './About';
import CounterRoute from './Counter';
//import CatalogView from 'views/CatalogView';
//import NotFoundView from 'views/NotFoundView';

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
      CounterRoute(store)
  //    CatalogView(store),
    ]
  });
};

export default createRoutes;
