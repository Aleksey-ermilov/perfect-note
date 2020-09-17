import React from 'react';

import { OptionsAppState } from './OtionsAppState/OptionsAppState';
import { NoteState } from './notesState/NoteState';
import { ModalState } from './modalState/ModalState';

export const ContextWrapper = ({ children }) => {

  return (
    <OptionsAppState>
      <NoteState>
        <ModalState>
          { children }
        </ModalState>
      </NoteState>
    </OptionsAppState>
  )
}