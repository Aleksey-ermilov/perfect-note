import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';

import Navigation from './navigation';

import { ContextWrapper } from './context/ContextWrapper';

export default function App() {
  return (
    <ContextWrapper>
      <PaperProvider>
        <MenuProvider>
          <Navigation/>
        </MenuProvider>
      </PaperProvider>
    </ContextWrapper>
  );
}



