import React, { useReducer }  from 'react'

import { UserContext } from '../context';
import { userReducer } from './userReducer';

import { Http } from '../../http';

import { REG } from '../types';

export const UserState = ({ children }) => {
  const initialState = {
    user: {
      id: '123',
      email: 'qq@qq',
      login: 'asd',
      note: 'something',
      pass: '11',
      dateLastChange: new Date().toString()
    }
  }
  const [state, dispatch] = useReducer(userReducer, initialState)

  const registration = user => {
    const data = Http.post('https://perfect-note.firebaseio.com/', user)
    console.log('user state reg data', data);
    // dispatch({ type: REG, user })
  }
  const login = (email, pass) => {

  }

  return <UserContext.Provider value={{
    user: state.user,

    registration,
  }}
  >{children}</UserContext.Provider>
}