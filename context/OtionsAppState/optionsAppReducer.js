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
    // console.log('reducer SET_FONT_FAMILY');
    return {
      ...state, fontFamily: action.fontFamily
    };
    // return state
  },
  [SET_FONT_SIZE]: (state, action) => {
    // console.log('reducer SET_FONT_SIZE');
    return {
      ...state, fontSize: action.fontSize
    };
    // return state
  },
  [SET_SORT_NOTES]: (state, action) => {
    // console.log('reducer SET_SORT_NOTES');
    return {
      ...state, sortNotes: action.sort
    };
    // return state
  },
  [SET_LOADING]: (state, action) => {
    // console.log('reducer SET_LOADING');
    return {
      ...state, loading: action.loading
    };
    // return state
  },
  [SET_APP_PASSWORD]: (state, action) => {
    // console.log('reducer SET_APP_PASSWORD');
    return {
      ...state, appPassword: action.appPass
    };
    // return state
  },
  [IS_AUTH]: (state, action) => ({ ...state, isAuth: action.auth }),
  DEFAULT: state => state,
}

export const optionsAppReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};