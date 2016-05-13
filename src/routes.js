import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from './components/App';
import { Home } from './components/Home';
import { About } from './components/About';
import { ChatChannelDisplay } from './components/ChatChannelDisplay';
// import { List } from 'containers/List';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/chat" component={ChatChannelDisplay} />
    <Route path="/about" component={About} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
