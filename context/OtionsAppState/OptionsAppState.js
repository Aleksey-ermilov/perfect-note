import React, { useReducer }  from 'react'

import { OptionsAppContext } from '../context';
import { optionsAppReducer } from './optionsAppReducer';

import { appColors, fontFamilyNote, fontSizeNote } from '../../theme';

import {
  CHANGE_IS_SHOW_CONTENT_NOTES,
  CHANGE_TYPE_NOTE,
  SET_APP_COLOR,
  SET_FONT_FAMILY,
  SET_FONT_SIZE,
} from '../types'

export const OptionsAppState = ({ children }) => {
  const initialState = {
    isShowContentNotes: false,
    typeNote: 'text',
    appColor: appColors[4].color,
    fontFamily: fontFamilyNote[1],
    fontSize: fontSizeNote[2],
  }

  const [state, dispatch] = useReducer(optionsAppReducer, initialState)

  const changeIsShowContentNotes = () => dispatch({ type: CHANGE_IS_SHOW_CONTENT_NOTES })
  const changeTypeNote = typeNote => dispatch({ type: CHANGE_TYPE_NOTE, typeNote })

  const setColor = color => dispatch({ type: SET_APP_COLOR, color})
  const setFontFamily = fontFamily => dispatch({ type: SET_FONT_FAMILY, fontFamily })
  const setFontSize = fontSize => dispatch({ type: SET_FONT_SIZE, fontSize })

  return <OptionsAppContext.Provider value={{
    isShowContentNotes: state.isShowContentNotes,
    typeNote: state.typeNote,
    appColor: state.appColor,
    fontFamily: state.fontFamily,
    fontSize: state.fontSize,

    changeIsShowContentNotes,
    changeTypeNote,
    setColor,
    setFontFamily,
    setFontSize,
  }}
  >{children}</OptionsAppContext.Provider>
}