import React from 'react';

import { REG } from '../types';

const handlers = {
  [REG]: (state, { user }) => ({
    ...state,
    user
  }),

  DEFAULT: state => state,
};

export const userReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};