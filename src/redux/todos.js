import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import generateId from '../utils/generate-id';

export const REFRESH = 'REFRESH';
export const LOAD = 'LOAD';
export const REMOVE = 'REMOVE';
export const FINISH = 'FINISH';
export const UPDATE = 'UPDATE';
export const CREATE = 'CREATE';
export const RESTORE = 'RESTORE';

// 初始state
export const INITIAL_STATE = immutable([]);

export const refresh = createAction(REFRESH);
export const load = createAction(LOAD, (todos) => (todos));
export const finish = createAction(FINISH, (id) => ({ id }));
export const create = createAction(CREATE, (todo) => (todo));
export const update = createAction(UPDATE, (todo) => (todo));
export const remove = createAction(REMOVE, (id) => ({ id }));
export const restore = createAction(RESTORE, (id) => ({ id }));

// 默认导出reducer
export default handleActions({
  [LOAD]: (state, { payload }) =>
    immutable(payload),
  [REMOVE]: (state, { payload }) =>
    state.filter((todo) => todo.id !== payload.id),
  [CREATE]: (state, { payload }) =>
    INITIAL_STATE.concat(state, Object.assign({}, payload, { id: generateId() })),
  [FINISH]: (state, { payload }) =>
    state.map((todo) => (todo.id === payload.id ? todo.merge({
      finished: true,
      finishedAt: (new Date()).toString()
    }) : todo)),
  [RESTORE]: (state, { payload }) =>
    state.map((todo) => (todo.id === payload.id ? todo.merge({
      finished: false
    }) : todo)),
  [UPDATE]: (state, { payload }) =>
    state.map((todo) => (todo.id === payload.id ? todo.merge(payload) : todo)),
}, INITIAL_STATE);
