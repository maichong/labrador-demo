import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas/';

import login from './login';
import user from './user';
import todos from './todos';

function createStore() {
  const rootReducer = combineReducers({ login, user, todos });

  return configureStore(rootReducer, rootSaga);
}

export default createStore();
