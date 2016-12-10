// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import project from './project';
import setting from './setting';

const rootReducer = combineReducers({
  project,
  setting,
  routing
});

export default rootReducer;
