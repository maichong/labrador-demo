/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-11-19
 * @author Li <li@maichong.it>
 */

import request from 'al-request';
import { setStore } from 'labrador-redux';
import store from './redux';

if (__DEV__) {
  console.log('开发环境');
}

// 向labrador-redux注册store
setStore(store);

export default class {
  async onLaunch() {
    await request('start');
  }
}
