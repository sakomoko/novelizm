// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import ProjectPage from './containers/ProjectPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProjectPage} />
    <Route path="/project" component={ProjectPage} />
  </Route>
);
