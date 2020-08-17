import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../theme';
import TrashPage from '../src/page/TrashPage';
import { HeaderButtons, Item } from 'react-navigation-header-buttons/index';
import { HeaderIcon } from '../src/comonents/HeaderIcon';
import { DrawerActions } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function AboutStack() {
  return (
    <Stack.Navigator
      initialRouteName="TrashPage"
      screenOptions={{
        headerStyle: { backgroundColor: colors.mainColor },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="TrashPage"
        component={TrashPage}
        options={({ navigation, route }) => ({
          title: 'Корзина',
          headerLeft: (props) => (
            <HeaderButtons HeaderButtonComponent={HeaderIcon}>
              <Item title='menu' iconName='ios-menu' onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) } />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  );
}