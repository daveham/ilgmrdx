import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from 'layouts/CoreLayout';
import HomeView from 'views/HomeView';
import CounterView from 'views/CounterView';
import CatalogView from 'views/CatalogView';
import AboutView from 'views/AboutView';

export default (
  <Route component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} />
    <Route component={CounterView} path='/counter' />
    <Route component={CatalogView} path='/catalog' />
    <Route component={AboutView} path='/about' />
  </Route>
);
