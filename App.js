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








/*
import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{padding:30}}>
      <Text>{'Что-то...'}</Text>
    </View>
  );
}
*/


