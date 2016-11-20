import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const REFRESH = 'REFRESH';
export const LOAD = 'LOAD';
export const CLEAR = 'CLEAR';

// 初始state
export const INITIAL_STATE = immutable({
  userId: '',
  nickName: '',
  avatarUrl: '',
  gender: 0,
  sessionId: ''
});

export const refresh = createAction(REFRESH);
export const load = createAction(LOAD, (user) => (user));
export const clear = createAction(CLEAR);

export default handleActions({
  [LOAD]: (state, action) => state.merge(action.payload)
}, INITIAL_STATE);
