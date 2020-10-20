import React, { useReducer }  from 'react'

import { NoteContext } from '../context'
import { noteReducer } from './noteReducer'

import {
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  NEW_CATEGORY,
  REMOVE_CATEGORY,
  ADD_TRASH,
  REESTABLISH_TRASH,
  REMOVE_TRASH,
  REMOVE_ALL_TRASH,
} from '../types'

import { data, categories } from '../../data';

export const NoteState = ({ children }) => {
  const initialState = {
    notes:data,
    categories: categories,
    trash: [],
  }
  const [state, dispatch] = useReducer(noteReducer, initialState)

  //  возможно нужно добавить и изменения категорий?..
  const newCategory = (category) => dispatch({ type: NEW_CATEGORY, category})
  const removeCategory = (category) => dispatch({ type: REMOVE_CATEGORY, category})

  const addNote = (note) => dispatch({ type: ADD_NOTE, note})
  const removeNote = (note) => dispatch({ type: REMOVE_NOTE, note})
  const updateNote = (note) => dispatch({ type: UPDATE_NOTE, note})

  const addTrash = (note) => dispatch({ type: ADD_TRASH, note})
  const removeTrash = (note) => dispatch({ type: REMOVE_TRASH, note})
  const removeAllTrash = () => dispatch({ type: REMOVE_ALL_TRASH})
  const reestablishTrash = (note) => dispatch({ type: REESTABLISH_TRASH, note})

  return <NoteContext.Provider value={{
    notes: state.notes,
    categories: state.categories,
    trash: state.trash,
    // selectNote: state.selectNote,
    addNote,
    removeNote,
    updateNote,
    // selectedNote,
    addTrash,
    removeTrash,
    removeAllTrash,
    reestablishTrash,

    newCategory,
    removeCategory,
  }}>{children}</NoteContext.Provider>
}