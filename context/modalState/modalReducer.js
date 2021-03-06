import React from 'react';

import { SHOW_MODAL, HIDDEN_MODAL,  } from '../types';

const handlers = {
  [SHOW_MODAL]: (state, action) => {
    // console.log('reducer SHOW_MODAL', action);
    return {
      ...state,
      isVisibleModal: true,
      Component: action.Component
    };
  },
  [HIDDEN_MODAL]: (state, action) => {
    // console.log('reducer HIDDEN_MODAL', action);
    return {
      ...state,
      isVisibleModal: false,
      Component: ''
    };
  },
  DEFAULT: state => state,
};

export const modalReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};