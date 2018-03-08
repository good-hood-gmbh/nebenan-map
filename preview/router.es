import React from 'react';
import Route from 'react-router/lib/Route';

import Error404 from './containers/error404';
import Map from './containers/map';
import Index from './containers/index';

export default () => (
  <div>
    <Route path="/" component={Index} />

    <Route path="/map" component={Map} />

    <Route path="*" component={Error404} />
  </div>
);
