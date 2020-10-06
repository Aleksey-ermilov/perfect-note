import { CHANGE_IS_SHOW_CONTENT_NOTES, CHANGE_TYPE_NOTE } from '../types';

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
    // if (state.typeNote === 'list'){
    //   return { ...state, typeNote: 'text' }
    // }
    // if (state.typeNote === 'text'){
    //   return { ...state, typeNote: 'list' }
    // }
    return {
      ...state, typeNote: action.typeNote
    };
    // return state
  },
  DEFAULT: state => state,
}

export const optionsAppReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};