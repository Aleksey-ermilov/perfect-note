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





/*
//Date Picker
import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View style={{paddingTop:50}}>
      <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};*/


