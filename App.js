import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigation from './navigation';
import { NoteState } from './context/NoteState';

export default function App() {
  return (
    <NoteState>
      <PaperProvider>
        <Navigation/>
      </PaperProvider>
    </NoteState>
  );
}


