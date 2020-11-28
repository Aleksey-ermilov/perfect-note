import React, { useReducer, useContext }  from 'react'

import { NoteContext, UserContext } from '../context';
import { userReducer } from './userReducer';

import { Http } from '../../http';

import firebase from 'firebase'

import { REG, LOGOUT, LOGIN, SET_ERROR, CLEAR_ERROR, UPDATE_USER, LOAD_USER_NOTES, CHANGE_PASSWORD } from '../types';

export const UserState = ({ children }) => {
  const { userListNotes, removeAllNotes, removeAllCategories } = useContext(NoteContext);
  const initialState = {
    user: null,
    error: null
    //   {
    //   id: '123',
    //   email: 'qq@qq',
    //   login: 'asd',
    //   note: 'something',
    //   categories: 'something',
    //   pass: '11',
    //   dateLastChange: new Date().toString()
    // }
  }
  const [state, dispatch] = useReducer(userReducer, initialState)
  const db = firebase.database()

  const registration = async ({ login, email, pass, dateLastChange = '', notes = [], categories = [] }) => {
    clearError()
      await firebase.auth().createUserWithEmailAndPassword(email,pass)
        .then(  user => {
          console.log('UserState reg user id',user.user.uid)
          db.ref(`/users/${user.user.uid}`).set({ id: user.user.uid, login, email, dateLastChange, notes, categories })
          dispatch({ type: REG, user: { id: user.user.uid, login, email, dateLastChange, notes, categories } })
        }).catch( e =>  {
          setError(e.toString())
        })

  }
  const logout = async () => {
    await firebase.auth().signOut()
    dispatch({ type: LOGOUT })
  }
  const login = async (email, pass) => {
    clearError()
    await firebase.auth().signInWithEmailAndPassword(email.trim(),pass.trim())
      .then(  user => {
        console.log('user_id',user.user.uid)

        db.ref(`/users/${user.user.uid}`).once('value').then( user => {
          // console.log('UserState login user',user.val());
          dispatch({ type: LOGIN, user: user.val() })
        })

      })
      .catch( e =>  {
        setError(e.toString())
      })
  }

  const update = async ({ id, login, email, dateLastChange = '', notes = [], categories = [] }) => {
    clearError()
    await db.ref(`/users/${id}`).update({login, email, dateLastChange, notes, categories }).catch( e =>  {
      console.log('User State update',e);
      // setError(e.toString())
      throw e
    })
    dispatch({ type: UPDATE_USER, user: { id, login, email, dateLastChange, notes } })
  }

  const loadUserNotes = async (id) => {
    clearError()
    await db.ref(`/users/${id}`).once('value').then( user => {
      user = user.val()
      userListNotes(user.notes,user.categories)
    }).catch( e =>  {
      console.log('User State update',e);
      // setError(e.toString())
    })
  }

  const changePassword = pass => {
    clearError()
    const currentUser = firebase.auth().currentUser
    currentUser.updatePassword(pass).then(() => {
      // console.log('changePassword successful');
    }).catch( e =>  {
      console.log('User State update',e);
      // setError(e.toString())
    })
  }

  const removeUser = async () => {
    const currentUser = await firebase.auth().currentUser;
    await currentUser.delete().then(() => {
      db.ref(`/users/${currentUser.uid}`).remove().catch( e =>  {
        console.log('User State remove',e);
        // setError(e.toString())
      })
      dispatch({ type: LOGOUT })
      removeAllNotes()
      removeAllCategories()
    }).catch( e =>  {
      throw e
    })
  }

  const getUserAtRerun = () => {
    firebase.auth().onAuthStateChanged( user => {
      if (user){
        console.log('LoadApp user ',user.uid);
        db.ref(`/users/${user.uid}`).once('value').then( user => {
          // console.log('UserState login user',user.val());
          dispatch({ type: LOGIN, user: user.val() })
        })
      }

    })
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
    getUserAtRerun,
  }}
  >{children}</UserContext.Provider>
}