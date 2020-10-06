import React, { useReducer }  from 'react'

import { OptionsAppContext } from '../context';
import { optionsAppReducer } from './optionsAppReducer';

import { CHANGE_IS_SHOW_CONTENT_NOTES, CHANGE_TYPE_NOTE } from '../types'

export const OptionsAppState = ({ children }) => {
  const initialState = {
    isShowContentNotes: false,
    typeNote: 'text',
  }

  const [state, dispatch] = useReducer(optionsAppReducer, initialState)

  const changeIsShowContentNotes = () => dispatch({ type: CHANGE_IS_SHOW_CONTENT_NOTES })
  const changeTypeNote = typeNote => dispatch({ type: CHANGE_TYPE_NOTE, typeNote })
  // const newCategory = (category) => dispatch({ type: NEW_CATEGORY, category})
  // const removeCategory = (category) => dispatch({ type: REMOVE_CATEGORY, category})

  return <OptionsAppContext.Provider value={{
    isShowContentNotes: state.isShowContentNotes,
    typeNote: state.typeNote,

    changeIsShowContentNotes,
    changeTypeNote,
  }}
  >{children}</OptionsAppContext.Provider>
}