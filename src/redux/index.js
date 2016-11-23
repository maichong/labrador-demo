import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas/';

import loginReducer from './login';
import userReducer from './user';
import todosReducer from './todos';

function createStore() {
  const rootReducer = combineReducers({
    login: loginReducer,
    user: userReducer,
    todos: todosReducer
  });

  return configureStore(rootReducer, rootSaga);
}

export default createStore();
