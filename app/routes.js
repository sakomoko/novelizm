// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import ProjectPage from './containers/ProjectPage';
import SettingPage from './containers/SettingPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ProjectPage} />
    <Route path="/project" component={ProjectPage} />
    <Route path="/setting" component={SettingPage} />
  </Route>
);
