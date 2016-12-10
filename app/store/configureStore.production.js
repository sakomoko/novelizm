// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import Setting from '../models/Setting';
import notification from '../middleware/notification';

const router = routerMiddleware(hashHistory);

const enhancer = compose(applyMiddleware(thunk, notification, router), autoRehydrate());

export default function configureStore(initialState: Object) {
  const store = createStore(rootReducer, initialState, enhancer);
  persistStore(store, {whitelist:['setting'], transforms: [immutableTransform({records: [Setting]})]});
  return store;
}
