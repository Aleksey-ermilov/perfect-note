import React, { useReducer }  from 'react'

import { NoteContext } from '../context'
import { noteReducer } from './noteReducer'

import {
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  NEW_CATEGORY,
  REMOVE_CATEGORY,
  REMOVE_ALL_TRASH,
  LOAD_CATEGORIES,
  LOAD_NOTES,
} from '../types'

import { data, categories } from '../../data';

import { DB } from '../../db';

export const NoteState = ({ children }) => {
  const initialState = {
    // notes:data,
    notes: [],
    // categories: categories,
    categories: [],
  }
  const [state, dispatch] = useReducer(noteReducer, initialState)

  const loadCategories = categories => dispatch({ type: LOAD_CATEGORIES, categories })
  const loadNotes = notes => dispatch({ type: LOAD_NOTES, notes })

  //  возможно нужно добавить и изменения категорий?..
  const newCategory = (category) => DB.createCategory(category).then( id => dispatch({ type: NEW_CATEGORY, category: {category,id} }) )
  const removeCategory = (id) => DB.removeCategory(id).then(() => dispatch({ type: REMOVE_CATEGORY, id}) )

  const addNote = (note) =>  DB.createNote(note).then( id => dispatch({ type: ADD_NOTE, note: {...note, id} }) )
  // const addNote = (note) => dispatch({ type: ADD_NOTE, note})

  const removeNote = (note) => DB.removeNote(note.id).then( () => dispatch({ type: REMOVE_NOTE, id: note.id}) )
  // const removeNote = (note) => dispatch({ type: REMOVE_NOTE, note})

  const updateNote = (note) => DB.updateNote(note).then( () => dispatch({ type: UPDATE_NOTE, note}) )
  // const updateNote = (note) => dispatch({ type: UPDATE_NOTE, note})

  const removeAllTrash = () => DB.removeAllNotesTrash().then( () => dispatch({ type: REMOVE_ALL_TRASH}) )
  // const removeAllTrash = () => dispatch({ type: REMOVE_ALL_TRASH})

  return <NoteContext.Provider value={{
    notes: state.notes,
    categories: state.categories,

    loadCategories,
    loadNotes,
    addNote,
    removeNote,
    updateNote,
    removeAllTrash,

    newCategory,
    removeCategory,
  }}>{children}</NoteContext.Provider>
}