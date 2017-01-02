import CoreLayout from 'layouts/CoreLayout';
import HomeRoute from './Home';
import AboutRoute from './About';
import CounterRoute from './Counter';
import CatalogRoute from './Catalog';

export const createRoutes = (store) => {
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
