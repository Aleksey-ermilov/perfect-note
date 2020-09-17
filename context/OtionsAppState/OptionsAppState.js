import React, { useReducer }  from 'react'

import { OptionsAppContext } from '../context';
import { optionsAppReducer } from './optionsAppReducer';

import { CHANGE_IS_SHOW_CONTENT_NOTES } from '../types'

export const OptionsAppState = ({ children }) => {
  const initialState = {
    isShowContentNotes: false
  }

  const [state, dispatch] = useReducer(optionsAppReducer, initialState)

  const changeIsShowContentNotes = () => dispatch({ type: CHANGE_IS_SHOW_CONTENT_NOTES })
  // const newCategory = (category) => dispatch({ type: NEW_CATEGORY, category})
  // const removeCategory = (category) => dispatch({ type: REMOVE_CATEGORY, category})

  return <OptionsAppContext.Provider value={{
    isShowContentNotes: state.isShowContentNotes,

    changeIsShowContentNotes
  }}
  >{children}</OptionsAppContext.Provider>
}