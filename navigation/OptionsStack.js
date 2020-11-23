import * as React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons/index';
import { HeaderIcon } from '../src/comonents/HeaderIcon';

import { colors } from '../theme';

import OptionsPage from '../src/page/OptionsPage';
import GeneralPage from '../src/page/optionsPages/GeneralPage';
import SafetyPage from '../src/page/optionsPages/SafetyPage';
import AboutPage from '../src/page/optionsPages/AboutPage';
import UserPage from '../src/page/optionsPages/UserPage';
import RegPage from '../src/page/optionsPages/RegPage';

import { useContext } from 'react';
import { OptionsAppContext } from '../context/context';

const Stack = createStackNavigator();

export default function OptionsStack() {
  const { appColor } = useContext(OptionsAppContext);

  return (
    <Stack.Navigator
      initialRouteName="OptionsPage"
      screenOptions={{
        headerStyle: { backgroundColor: appColor },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="OptionsPage"
        component={OptionsPage}
        options={({ navigation, route }) => {
          return {
            title: 'Настройки',
            headerLeft: (props) => (
              <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                <Item title='menu' iconName='ios-menu'
                      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
              </HeaderButtons>
            )
          }
        }
        }
      />
      <Stack.Screen
        name="GeneralPage"
        component={GeneralPage}
        options={{ title: 'Общие', }}
      />
      <Stack.Screen
        name="SafetyPage"
        component={SafetyPage}
        options={{ title: 'Безопасность', }}
      />
      <Stack.Screen
        name="UserPage"
        component={UserPage}
        options={{ title: 'Пользователь', }}
      />
      <Stack.Screen
        name="AboutPage"
        component={AboutPage}
        options={{ title: 'О программе', }}
      />
      <Stack.Screen
        name="RegPage"
        component={RegPage}
        options={ ({navigation}) => ({ title: 'Регистрация',
          headerLeft: (props) => (
            <HeaderBackButton
              {...props}
              onPress={() => {
                navigation.navigate('MainStack', {
                  screen: 'MainPage', params: {
                    category: '1',
                  },
                });
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
}