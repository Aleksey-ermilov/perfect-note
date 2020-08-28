import React, { useReducer }  from 'react'

import { NoteContext } from '../context'
import { noteReducer } from './noteReducer'

import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE } from '../types'

import { data } from '../../data';

export const NoteState = ({ children }) => {
  const initialState = {
    notes:data
  }
  const [state, dispatch] = useReducer(noteReducer, initialState)

  const addNote = (note) => dispatch({ type: ADD_NOTE, note})
  const removeNote = (note) => dispatch({ type: REMOVE_NOTE, note})
  const updateNote = (note) => dispatch({ type: UPDATE_NOTE, note})

  return <NoteContext.Provider value={{
    notes: state.notes,
    addNote,
    removeNote,
    updateNote,
  }}>{children}</NoteContext.Provider>
}