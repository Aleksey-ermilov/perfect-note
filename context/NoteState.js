import React, { useReducer }  from 'react'

import { NoteContext } from './context'
import { noteReducer } from './noteReducer'
import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE } from './types'

import { data } from '../data';

export const NoteState = ({ children }) => {
  const initialState = {
    notes:data
  }
  const [state, dispatch] = useReducer(noteReducer, initialState)

  const addNote = () => dispatch({ type: ADD_NOTE, title: '123'})

  return <NoteContext.Provider value={{
    notes: state.notes,
    addNote,
  }}>{children}</NoteContext.Provider>
}