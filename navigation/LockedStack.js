import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LockedPage from '../src/page/LockedPage';

import { colors } from '../theme';

import { OptionsAppContext } from '../context/context';

const Stack = createStackNavigator();

export default function LockedStack() {
  const { appColor } = useContext(OptionsAppContext);

  return (
    <Stack.Navigator
      initialRouteName="LockedPage"
      screenOptions={{
        headerStyle: { backgroundColor: appColor.appColor },
        headerTintColor: appColor.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="LockedPage"
        component={LockedPage}
        options={{
          title: 'Perfect Note',
        }}
      />

    </Stack.Navigator>
  );
}