import wx from 'labrador';
import { put } from 'redux-saga/effects';
import request from 'al-request';
import { load } from '../redux/user';

// 刷新用户信息
export default function* userSaga() {
  try {
    let res = yield wx.login();
    let data = yield wx.getUserInfo();
    let user = yield request.post('api/login', {
      code: res.code,
      ...data
    });
    yield put(load(user));
  } catch (error) {
    console.log('refresh error', error);
  }
}
