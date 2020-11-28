import {
  ADD_NOTE,
  REMOVE_NOTE,
  UPDATE_NOTE,
  NEW_CATEGORY,
  REMOVE_CATEGORY,
  REMOVE_ALL_TRASH,
  LOAD_CATEGORIES,
  LOAD_NOTES,
  LOAD_USER_DATA,
  REMOVE_ALL_CATEGORIES,
  REMOVE_ALL_NOTES,
} from '../types';

const handlers = {
  [NEW_CATEGORY]: (state, action) => {
    // console.log('reducer NEW_CATEGORY', action.category);
    return {
      ...state,
      categories: [
        ...state.categories, action.category
      ],
    };
    // return state
  },
  [REMOVE_CATEGORY]: (state, action) => {
    // console.log('reducer REMOVE_CATEGORY 888   ', action.id);
    return {
      ...state,
      notes: [
        ...state.notes.map( note => {
          if (note.category === action.id){
            return({...note, category: '1', isTrash: true})
          }else {
            return note
          }
        })
      ],
      categories: state.categories.filter(item => item.id !== action.id),
    };
    // return state
  },
  [ADD_NOTE]: (state, action) => {
    // console.log('reducer add_note', action.note);
    return {
      ...state, notes: [
        action.note,...state.notes,
      ],
    };
    // return state
  },
  [REMOVE_NOTE]: (state, action) => {
    // console.log('reducer REMOVE_NOTE', action.id);
    return { ...state, notes: state.notes.filter(note => note.id !== action.id) };
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
  [REMOVE_ALL_TRASH]: (state, action) => {
    // console.log('reducer REMOVE_ALL_TRASH', action);
    return {
      ...state,
      notes: state.notes.filter( note => !note.isTrash ),
    };
    // return state
  },
  [LOAD_CATEGORIES]: (state, action) => {
    // console.log('reducer LOAD_CATEGORIES', action.categories);
    return {
      ...state,
      categories: action.categories
    };
    // return state
  },
  [LOAD_NOTES]: (state, action) => {
    // console.log('reducer LOAD_NOTES', action.notes);
    return {
      ...state,
      notes: action.notes
    };
    // return state
  },
  [LOAD_USER_DATA]: (state, { user : {notes, categories} }) => ({
    ...state,
    notes,
    categories
  }),
  [REMOVE_ALL_NOTES]: (state, action ) => ({
    ...state,
    notes: [],
  }),
  [REMOVE_ALL_CATEGORIES]: (state, action ) => ({
    ...state,
    categories: state.categories.filter( cat => cat.id === '1' ),
  }),
  DEFAULT: state => state,
};

export const noteReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};