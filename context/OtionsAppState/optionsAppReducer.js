import { CHANGE_IS_SHOW_CONTENT_NOTES } from '../types';

const handlers = {
  [CHANGE_IS_SHOW_CONTENT_NOTES]: (state, action) => {
    // console.log('reducer CHANGE_IS_SHOW_CONTENT_NOTES');
    return {
      ...state, isShowContentNotes: !state.isShowContentNotes
    };
    // return state
  },
  DEFAULT: state => state,
}

export const optionsAppReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};