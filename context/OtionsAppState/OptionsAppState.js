import React, { useReducer }  from 'react'

import { OptionsAppContext } from '../context';
import { optionsAppReducer } from './optionsAppReducer';

import { appColors, fontFamilyNote, fontSizeNote, sortArray } from '../../theme';
import { setFontSizeStory, setFontFamilyStory, setAppColorStory, setSortNotesStory, setAppPasswordStory } from '../../storage';

import {
  CHANGE_IS_SHOW_CONTENT_NOTES,
  CHANGE_TYPE_NOTE,
  SET_APP_COLOR,
  SET_FONT_FAMILY,
  SET_FONT_SIZE,
  SET_SORT_NOTES,
  SET_LOADING,
  SET_APP_PASSWORD,
  IS_AUTH,
} from '../types'

export const OptionsAppState = ({ children }) => {
  const initialState = {
    loading: true,
    isShowContentNotes: false,
    typeNote: 'text',
    appColor: appColors[4].color,
    fontFamily: fontFamilyNote[1],
    fontSize: fontSizeNote[2],
    sortNotes: sortArray[0],
    appPassword: {},
    isAuth: false,
  }

  const [state, dispatch] = useReducer(optionsAppReducer, initialState)

  const changeIsShowContentNotes = () => dispatch({ type: CHANGE_IS_SHOW_CONTENT_NOTES })
  const changeTypeNote = typeNote => dispatch({ type: CHANGE_TYPE_NOTE, typeNote })

  const setColor = color => setAppColorStory(color).then( () => dispatch({ type: SET_APP_COLOR, color}) )
  // const setColor = color => dispatch({ type: SET_APP_COLOR, color})

  const setFontFamily = fontFamily => setFontFamilyStory(fontFamily).then( () => dispatch({ type: SET_FONT_FAMILY, fontFamily }) )
  // const setFontFamily = fontFamily => dispatch({ type: SET_FONT_FAMILY, fontFamily })

  const setFontSize = fontSize => setFontSizeStory(fontSize).then( () => dispatch({ type: SET_FONT_SIZE, fontSize }) )
  // const setFontSize = fontSize => dispatch({ type: SET_FONT_SIZE, fontSize })

  const setSortNote = sort => setSortNotesStory(sort).then( () => dispatch({ type: SET_SORT_NOTES, sort }) )

  const setLoading = loading => dispatch({ type: SET_LOADING, loading })

  const setAppPassword = appPass => setAppPasswordStory(appPass).then( () => dispatch({ type: SET_APP_PASSWORD, appPass }) )

  const setIsAuth = auth => dispatch({ type: IS_AUTH, auth })

  return <OptionsAppContext.Provider value={{
    loading: state.loading,
    isShowContentNotes: state.isShowContentNotes,
    typeNote: state.typeNote,
    appColor: state.appColor,
    fontFamily: state.fontFamily,
    fontSize: state.fontSize,
    sortNotes: state.sortNotes,
    appPassword: state.appPassword,
    isAuth: state.isAuth,

    changeIsShowContentNotes,
    changeTypeNote,
    setColor,
    setFontFamily,
    setFontSize,
    setSortNote,
    setLoading,
    setAppPassword,
    setIsAuth,
  }}
  >{children}</OptionsAppContext.Provider>
}