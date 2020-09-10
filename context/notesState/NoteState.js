import React, { useReducer }  from 'react'

import { NoteContext } from '../context'
import { noteReducer } from './noteReducer'

import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE, SELECTED_NOTE, NEW_CATEGORY, REMOVE_CATEGORY } from '../types'

import { data, categories } from '../../data';

export const NoteState = ({ children }) => {
  const initialState = {
    notes:data,
    categories: categories,
    // selectNote: null,
  }
  const [state, dispatch] = useReducer(noteReducer, initialState)

  //  возможно нужно добавить и изменения категорий?..
  const newCategory = (category) => dispatch({ type: NEW_CATEGORY, category})
  const removeCategory = (category) => dispatch({ type: REMOVE_CATEGORY, category})

  const addNote = (note) => dispatch({ type: ADD_NOTE, note})
  const removeNote = (note) => dispatch({ type: REMOVE_NOTE, note})
  const updateNote = (note) => dispatch({ type: UPDATE_NOTE, note})
  const selectedNote = (selectNote) => dispatch({ type: SELECTED_NOTE, selectNote})

  return <NoteContext.Provider value={{
    notes: state.notes,
    categories: state.categories,
    // selectNote: state.selectNote,
    addNote,
    removeNote,
    updateNote,
    selectedNote,

    newCategory,
    removeCategory,
  }}>{children}</NoteContext.Provider>
}