import { SHOW_MODAL, HIDDEN_MODAL,  } from '../types';
import { Button, Text } from 'react-native';
import React from 'react';

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
      Component: () =>  <> <Text>Example Modal</Text> </>
    };
  },
  DEFAULT: state => state,
};

export const modalReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};