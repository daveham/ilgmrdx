import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import CoreLayout from 'layouts/CoreLayout';
import HomeView from 'views/HomeView';
import CounterView from 'views/CounterView';
import CatalogView from 'views/CatalogView';
import AboutView from 'views/AboutView';
import NotFoundView from 'views/NotFoundView';

const routes = (/* store */) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route component={CounterView} path='/counter' />
    <Route component={CatalogView} path='/catalog' />
    <Route component={AboutView} path='/about' />
    <Route path='/404' component={NotFoundView} />
    <Redirect from='*' to='/404' />
  </Route>
);

export default routes;
