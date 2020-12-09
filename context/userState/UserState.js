import React, { useReducer, useContext }  from 'react'

import firebase from 'firebase'

import { NoteContext, UserContext } from '../context';
import { userReducer } from './userReducer';

import {  } from '../../storage';

import { REG, LOGOUT, LOGIN, SET_ERROR, CLEAR_ERROR, UPDATE_USER, SET_USER_ICON } from '../types';

export const UserState = ({ children }) => {
  const { userListNotes, removeAllNotes, removeAllCategories } = useContext(NoteContext);
  const initialState = {
    user: null,
    error: null,
  }
  const [state, dispatch] = useReducer(userReducer, initialState)
  const db = firebase.database()

  const registration = async ({ login, email, pass, dateLastChange = '', notes = [], categories = [], icon = '3' }) => {
    clearError()
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email,pass)
      await db.ref(`/users/${user.user.uid}`).set({ id: user.user.uid, login, email, dateLastChange, notes, categories, icon })
      dispatch({ type: REG, user: { id: user.user.uid, login, email, dateLastChange, notes, categories, icon } })
    } catch (e){
      console.log('registration error',e.message);
      setError(e.message)
    }

  }
  const logout = async () => {
    await firebase.auth().signOut()
    dispatch({ type: LOGOUT })
  }
  const login = async (email, pass) => {
    clearError()
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(email.trim(),pass.trim())
      const res = await db.ref(`/users/${user.user.uid}`).once('value')
      const data = await res.val()
      console.log(data);
      dispatch({ type: LOGIN, user: data })
    }catch (e){
      console.log('login error',e.message);
      setError(e.message)
    }
  }

  const update = async ({ id, login, email, dateLastChange = '', notes = [], categories = [] }) => {
    clearError()
    try {
      await db.ref(`/users/${id}`).update({login, email, dateLastChange, notes, categories })
      dispatch({ type: UPDATE_USER, user: { id, login, email, dateLastChange, notes } })
    }catch (e){
      console.log('User State update error',e.message);
      setError(e.message)
    }
  }

  const loadUserNotes = async (id) => {
    clearError()
    try {
      const res = await db.ref(`/users/${id}`).once('value')
      const user = await res.val()
      userListNotes(user.notes,user.categories)
    }catch (e){
      console.log('User State loadUserNotes error',e.message);
      setError(e.message)
    }
  }

  const changePassword = async pass => {
    clearError()
    try {
      const currentUser = await firebase.auth().currentUser
      await currentUser.updatePassword(pass)
    }catch (e){
      console.log('User State changePassword error',e.message);
      setError(e.message)
    }
  }

  const removeUser = async () => {
    clearError()
    try {
      const currentUser = await firebase.auth().currentUser;
      await currentUser.delete()
      await db.ref(`/users/${currentUser.uid}`).remove()
      dispatch({ type: LOGOUT })
      await removeAllNotes()
      await removeAllCategories()
    }catch (e){
      console.log('User State removeUser error',e.message);
      setError(e.message)
    }
  }

  const getUserAfterRerun = async () => {
    clearError()
    try {
      await firebase.auth().onAuthStateChanged( async user => {
        if (user){
          console.log('LoadApp user 88',user.uid);
          const res = await db.ref(`/users/${user.uid}`).once('value')
          const data = await res.val()
          dispatch({ type: LOGIN, user: data })
        }
      })
    }catch (e){
      console.log('getUserAfterRerun error',e.message);
      setError(e.message)
    }
  }

  const setUserIcon = async (user, icon) => {
    clearError()
    try {
      await db.ref(`/users/${user.id}`).update({ icon })
      dispatch({ type: SET_USER_ICON, icon })
    }catch (e){
      console.log('setUserIcon error',e.message);
      setError(e.message)
    }
  }

  const setError = error => dispatch({ type: SET_ERROR, error })
  const clearError = () => dispatch({type: CLEAR_ERROR })



  return <UserContext.Provider value={{
    user: state.user,
    error: state.error,

    registration,
    logout,
    login,
    update,
    loadUserNotes,
    changePassword,
    removeUser,
    getUserAfterRerun,
    setUserIcon,
  }}
  >{children}</UserContext.Provider>
}