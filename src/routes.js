import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from 'components/App';
import { Home } from 'components/Home';
import { DataDisplay } from 'components/DataDisplay';
// import { List } from 'containers/List';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/chat" component={DataDisplay} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
