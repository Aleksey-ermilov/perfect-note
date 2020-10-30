import {
  CHANGE_IS_SHOW_CONTENT_NOTES,
  CHANGE_TYPE_NOTE,
  SET_APP_COLOR,
  SET_FONT_FAMILY,
  SET_FONT_SIZE,
} from '../types';

const handlers = {
  [CHANGE_IS_SHOW_CONTENT_NOTES]: (state, action) => {
    // console.log('reducer CHANGE_IS_SHOW_CONTENT_NOTES');
    return {
      ...state, isShowContentNotes: !state.isShowContentNotes
    };
    // return state
  },
  [CHANGE_TYPE_NOTE]: (state, action) => {
    // console.log('reducer CHANGE_TYPE_NOTE');
    return {
      ...state, typeNote: action.typeNote
    };
    // return state
  },
  [SET_APP_COLOR]: (state, action) => {
    // console.log('reducer SET_APP_COLOR');
    return {
      ...state, appColor: action.color
    };
    // return state
  },
  [SET_FONT_FAMILY]: (state, action) => {
    // console.log('reducer SET_APP_COLOR');
    return {
      ...state, fontFamily: action.fontFamily
    };
    // return state
  },
  [SET_FONT_SIZE]: (state, action) => {
    // console.log('reducer SET_APP_COLOR');
    return {
      ...state, fontSize: action.fontSize
    };
    // return state
  },
  DEFAULT: state => state,
}

export const optionsAppReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};