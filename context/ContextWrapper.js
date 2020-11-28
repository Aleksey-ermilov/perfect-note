import React from 'react';

import { OptionsAppState } from './OtionsAppState/OptionsAppState';
import { NoteState } from './notesState/NoteState';
import { ModalState } from './modalState/ModalState';
import { UserState } from './userState/UserState';

export const ContextWrapper = ({ children }) => {

  return (
    <OptionsAppState>
      <NoteState>
        <UserState>
          <ModalState>
            {children}
          </ModalState>
        </UserState>
      </NoteState>
    </OptionsAppState>
  )
    ;
};