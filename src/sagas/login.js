import wx from 'labrador';
import { put } from 'redux-saga/effects';
import request from 'al-request';
import { loginSuccess, loginFailure } from '../redux/login';
import { load } from '../redux/user';

// 请求登录
export default function* loginSaga() {
  try {
    let res = yield wx.login();
    let data = yield wx.getUserInfo();
    let user = yield request.post('api/login', {
      code: res.code,
      ...data
    });
    yield put(loginSuccess(user.id));
    yield put(load(user));
  } catch (error) {
    console.log('login error', error);
    yield put(loginFailure(error));
  }
}
