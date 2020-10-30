import * as React from 'react';
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons/index';
import { HeaderIcon } from '../src/comonents/HeaderIcon';

import { colors } from '../theme';

import OptionsPage from '../src/page/OptionsPage';
import GeneralPage from '../src/page/optionsPages/GeneralPage';
import SafetyPage from '../src/page/optionsPages/SafetyPage';

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
            ),
            // headerRight: (props) => (
            //   <HeaderButtons HeaderButtonComponent={HeaderIcon}>
            //     <DropDownMenuHeader
            //       ComponentTrigger={Item}
            //       componentTriggerProps={{ title: 'menu', iconName: 'md-more' }}
            //       menuOptions={menuTrashPade(isShowContentNotes, changeIsShowContentNotes, removeAllTrash)}
            //     />
            //   </HeaderButtons>
            // ),
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
    </Stack.Navigator>
  );
}