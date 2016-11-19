import { takeLatest } from 'redux-saga';
import { STARTUP } from '../redux/startup';
import { LOGIN } from '../redux/login';
import { REFRESH } from '../redux/user';
import startup from './startup';
import login from './login';
import user from './user';

// 当action触发时，执行特定saga
export default function* root() {
  yield [
    takeLatest(STARTUP, startup),
    takeLatest(LOGIN, login),
    takeLatest(REFRESH, user),
  ];
}
