import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE, SELECTED_NOTE, NEW_CATEGORY, REMOVE_CATEGORY } from '../types';

const handlers = {
  [NEW_CATEGORY]: (state, action) => {
    // console.log('reducer NEW_CATEGORY', action.note);
    return {
      ...state, categories: [...state.categories, {
        category: action.category,
        id: Date.now().toString(),
      }],
    };
    // return state
  },
  [REMOVE_CATEGORY]: (state, action) => {
    // console.log('reducer REMOVE_CATEGORY', action);
    return {
      ...state,
      categories: state.categories.filter(item => item.id !== action.category.id),
      notes: state.notes.filter(note => note.category !== action.category.id)
    };
    // return state
  },
  [ADD_NOTE]: (state, action) => {
    // console.log('reducer add_note', action.note);
    return {
      ...state, notes: [...state.notes, {
        ...action.note,
        id: Date.now().toString(),
        // itemBackground: 'darkred',
        // category: 'all',
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
  [SELECTED_NOTE]: (state, action) => {
    // console.log('reducer SELECTED_NOTE', action.selectNote);
    return {
      ...state, selectNote: action.selectNote
    };
    // return state
  },
  DEFAULT: state => state,
};

export const noteReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};