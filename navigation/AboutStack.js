import AboutPage from '../src/page/AboutPage';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../theme';
import { HeaderButtons, Item } from 'react-navigation-header-buttons/index';
import { HeaderIcon } from '../src/comonents/HeaderIcon';
import { DrawerActions } from '@react-navigation/native';
import { useContext } from 'react';
import { OptionsAppContext } from '../context/context';

const Stack = createStackNavigator();

export default function AboutStack() {
  const { appColor } = useContext(OptionsAppContext);

  return (
    <Stack.Navigator
      initialRouteName="AboutPage"
      screenOptions={{
        headerStyle: { backgroundColor: appColor.appColor },
        headerTintColor: appColor.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="AboutPage"
        component={AboutPage}
        options={({ navigation, route }) => ({
          title: 'О приложении',
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