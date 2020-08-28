import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE } from '../types';

const handlers = {
  [ADD_NOTE]: (state, action) => {
    // console.log('reducer add_note', action.note);
    return {
      ...state, notes: [...state.notes, {
        ...action.note,
        id: Date.now().toString(),
        itemBackground: 'darkred',
        category: 'all',
      }],
    };
    // return state
  },
  [REMOVE_NOTE]: (state, action) => {
    // console.log('reducer REMOVE_NOTE', action.note);
    return { ...state, notes: state.notes.filter(note => note.id !== action.note.id) };
    // return state
  },
  [UPDATE_NOTE]: (state, action) => {
    // console.log('reducer UPDATE_NOTE', action.note);
    return {
      ...state, notes: state.notes.map(note => {
        if (note.id === action.note.id) {
          return action.note;
        }
        return note;
      }),
    };
    // return state
  },
  DEFAULT: state => state,
};

export const noteReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};