import React, { useReducer }  from 'react'

import { ModalContext } from '../context';
import { modalReducer } from './modalReducer';

import { SHOW_MODAL, HIDDEN_MODAL } from '../types';

export const ModalState = ({ children }) => {
  const initialState = {
    isVisibleModal: false,
    Component: ''
  }
  const [state, dispatch] = useReducer(modalReducer, initialState)

  const showModal = (Component) => dispatch({ type: SHOW_MODAL, Component})
  const hiddenModal = () => dispatch({ type: HIDDEN_MODAL})

  return <ModalContext.Provider value={{
    isVisibleModal: state.isVisibleModal,
    Component: state.Component,
    showModal, hiddenModal
  }}
  >{children}</ModalContext.Provider>
}