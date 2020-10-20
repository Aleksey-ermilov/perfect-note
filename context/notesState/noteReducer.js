import {
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  SELECTED_NOTE,
  NEW_CATEGORY,
  REMOVE_CATEGORY,
  ADD_TRASH,
  REMOVE_TRASH,
  REMOVE_ALL_TRASH,
  REESTABLISH_TRASH,
} from '../types';

const handlers = {
  [NEW_CATEGORY]: (state, action) => {
    // console.log('reducer NEW_CATEGORY', action.note);
    return {
      ...state,
      categories: [
        ...state.categories, {
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
      trash: [
        ...state.notes.filter(note => note.category === action.category.id).map( note => ({...note, category: 'all'}) ),
        ...state.trash,
      ],
      notes: state.notes.filter(note => note.category !== action.category.id),
    };
    // return state
  },
  [ADD_NOTE]: (state, action) => {
    // console.log('reducer add_note', action.note);
    return {
      ...state, notes: [{
        ...action.note,
        id: Date.now().toString(),
      },
        ...state.notes,
      ],
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
  // [SELECTED_NOTE]: (state, action) => {
  //   // console.log('reducer SELECTED_NOTE', action.selectNote);
  //   return {
  //     ...state, selectNote: action.selectNote
  //   };
  //   // return state
  // },
  [ADD_TRASH]: (state, action) => {
    // console.log('reducer ADD_TRASH', action.note);
    return {
      ...state,
      notes: state.notes.filter(note => note.id !== action.note.id),
      trash: [action.note, ...state.trash],
    };
    // return state
  },
  [REMOVE_TRASH]: (state, action) => {
    // console.log('reducer REMOVE_TRASH', action.note);
    return {
      ...state,
      trash: state.trash.filter(note => note.id !== action.note.id),
    };
    // return state
  },
  [REMOVE_ALL_TRASH]: (state, action) => {
    // console.log('reducer REMOVE_TRASH', action.note);
    return {
      ...state,
      trash: [],
    };
    // return state
  },
  [REESTABLISH_TRASH]: (state, action) => {
    // console.log('reducer REESTABLISH_TRASH', action.note);
    return {
      ...state,
      notes: [action.note, ...state.notes],
      trash: state.trash.filter(note => note.id !== action.note.id),
    };
    // return state
  },
  DEFAULT: state => state,
};

export const noteReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};