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
  LOAD_USER_DATA,
  REMOVE_ALL_CATEGORIES,
  REMOVE_ALL_NOTES,
} from '../types'

import { DB } from '../../db';

export const NoteState = ({ children }) => {
  const initialState = {
    notes: [],
    categories: [],
  }
  const [state, dispatch] = useReducer(noteReducer, initialState)

  const loadCategories = () => DB.getCategories().then( categories => dispatch({ type: LOAD_CATEGORIES, categories }) )
  const loadNotes = () => DB.getNotes().then( notes => dispatch({ type: LOAD_NOTES, notes }) )

  //  возможно нужно добавить и изменения категорий?..
  const newCategory = (category) => DB.createCategory(category).then( id => dispatch({ type: NEW_CATEGORY, category: {category,id} }) )
  const removeCategory = (id) => DB.removeCategory(id).then(() => dispatch({ type: REMOVE_CATEGORY, id}) )
  const removeAllCategories = () => DB.removeAllCategories().then( () => dispatch({ type: REMOVE_ALL_CATEGORIES }) )

  const addNote = (note) =>  DB.createNote(note).then( id => dispatch({ type: ADD_NOTE, note: {...note, id} }) )
  const removeNote = (note) => DB.removeNote(note.id).then( () => dispatch({ type: REMOVE_NOTE, id: note.id}) )
  const updateNote = (note) => DB.updateNote(note).then( () => dispatch({ type: UPDATE_NOTE, note}) )
  const removeAllTrash = () => DB.removeAllNotesTrash().then( () => dispatch({ type: REMOVE_ALL_TRASH}) )
  const removeAllNotes = () => DB.removeAllNotes().then( () => dispatch({ type: REMOVE_ALL_NOTES }) )

  const userListNotes = (notes, categories) => DB.setUserData(notes, categories)
    .then( () => dispatch({ type: LOAD_USER_DATA, data:{notes,categories} }) )

  return <NoteContext.Provider value={{
    notes: state.notes,
    categories: state.categories,

    loadCategories,
    loadNotes,

    addNote,
    removeNote,
    updateNote,
    removeAllTrash,
    userListNotes,
    removeAllNotes,

    newCategory,
    removeCategory,
    removeAllCategories,
  }}>{children}</NoteContext.Provider>
}