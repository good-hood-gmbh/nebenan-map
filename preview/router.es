import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Error404 from './containers/error404';
import Map from './containers/map';
import Index from './containers/index';

export default () => (
  <Switch>
    <Route path="/" component={Index} exact />
    <Route path="/map" component={Map} />
    <Route component={Error404} />
  </Switch>
);
