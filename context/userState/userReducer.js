import React from 'react';

import { REG, LOGOUT, LOGIN,SET_ERROR, CLEAR_ERROR, UPDATE_USER } from '../types';

const handlers = {
  [REG]: (state, { user }) => ({ ...state, user }),
  [LOGOUT]: (state, action) => ({ ...state, user: null }),
  [LOGIN]: (state, { user }) => ({ ...state, user }),
  [SET_ERROR]: (state, { error }) => ({ ...state, error }),
  [CLEAR_ERROR]: (state, action) => ({ ...state, error: null }),
  [UPDATE_USER]: (state, { user }) => ({ ...state, user }),

  DEFAULT: state => state,
};

export const userReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};