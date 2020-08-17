import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE } from './types'

const handlers = {
  [ADD_NOTE]: (state, action) => {
    console.log('reducer add_note', action.title);
    return state
  },
  [REMOVE_NOTE]: (state, action) => ({...state}),
  [UPDATE_NOTE]: (state, action) => ({...state}),
  DEFAULT: state => state,
}

export const noteReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}