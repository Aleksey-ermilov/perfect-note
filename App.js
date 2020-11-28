import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { MenuProvider } from 'react-native-popup-menu';

import firebase from 'firebase/app'

import Navigation from './navigation';

import { ContextWrapper } from './context/ContextWrapper';
import { LoadApp } from './LoadApp';

import { firebaseConfig } from './theme'

export default function App() {

  firebase.initializeApp(firebaseConfig)

  return (
    <ContextWrapper>
      <PaperProvider>
        <MenuProvider>
          <LoadApp>
            <Navigation/>
          </LoadApp>
        </MenuProvider>
      </PaperProvider>
    </ContextWrapper>
  );
}


/*
import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  console.log('date', new Date().getTime().toString());
  return (
    <View style={{padding:30}}>
      <Text>{'Что-то...'}</Text>
      <Text>{'Что-то...'}</Text>
    </View>
  );
}
*/


