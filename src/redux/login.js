import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// 请求登录action
export const login = createAction(LOGIN);

// 注销action
export const logout = createAction(LOGOUT);

// 登录成功
export const loginSuccess = createAction(LOGIN_SUCCESS, (userId) => ({ userId }));

// 登录失败
export const loginFailure = createAction(LOGIN_FAILURE, (error) => ({ error }));


// 初始state
export const INITIAL_STATE = immutable({
  userId: null,
  error: null,
  fetching: false
});

export default handleActions({
  LOGIN: (state) => state.merge({ fetching: true }),
  LOGOUT: () => INITIAL_STATE,
  LOGIN_SUCCESS: (state, action) => state.merge({ fetching: false, error: null, userId: action.payload.userId }),
  LOGIN_FAILURE: (state, action) => state.merge({ fetching: false, error: action.payload.error })
}, INITIAL_STATE);
