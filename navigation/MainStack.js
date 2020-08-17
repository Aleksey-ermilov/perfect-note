import * as React from 'react';
import { TouchableOpacity } from 'react-native'
import { createStackNavigator,HeaderBackButton } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { Feather } from '@expo/vector-icons';

import MainPage from '../src/page/MainPage';

import { HeaderIcon } from '../src/comonents/HeaderIcon';

import NotePage from '../src/page/NotePage';

import { colors } from '../theme';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainPage"
      screenOptions={{
        headerStyle: { backgroundColor: colors.mainColor },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={({ navigation, route }) => ({
          title: 'Заметки',
          headerLeft: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderIcon}>
              <Item title='menu' iconName='ios-menu' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) } />
            </HeaderButtons>
          ),
        })}
      />
      <Stack.Screen
        name="NotePage"
        component={NotePage}
        options={({ navigation, route }) => ({
          title: 'Создать',
          headerRight: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderIcon}>
              <Item title='menu' iconName='md-more' onPress={ () => console.log('Доп.настройки') } />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  )
}