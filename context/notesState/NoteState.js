import React, { useReducer }  from 'react'

import { NoteContext } from '../context'
import { noteReducer } from './noteReducer'

import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE, SELECTED_NOTE } from '../types'

import { data } from '../../data';

export const NoteState = ({ children }) => {
  const initialState = {
    notes:data,
    selectNote: null,
  }
  const [state, dispatch] = useReducer(noteReducer, initialState)

  const addNote = (note) => dispatch({ type: ADD_NOTE, note})
  const removeNote = (note) => dispatch({ type: REMOVE_NOTE, note})
  const updateNote = (note) => dispatch({ type: UPDATE_NOTE, note})
  const selectedNote = (selectNote) => dispatch({ type: SELECTED_NOTE, selectNote})

  return <NoteContext.Provider value={{
    notes: state.notes,
    selectNote: state.selectNote,
    addNote,
    removeNote,
    updateNote,
    selectedNote,
  }}>{children}</NoteContext.Provider>
}