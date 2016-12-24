import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from '../components/App/AppComponent';
import Main from '../components/Main/MainComponent';
import Home from '../components/Home/HomeComponent';

const routes = () => (
  <Router history={hashHistory}>
    <Route component={App}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home} />
      </Route>
    </Route>
  </Router>
);

export default routes;
