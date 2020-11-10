import React, { useContext } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons/index';
import { HeaderIcon } from '../src/comonents/HeaderIcon';

import { colors } from '../theme';

import TrashPage from '../src/page/TrashPage';

import { menuTrashPade } from '../src/comonents/configDropDownMenu/menuTrashPade';

import { DropDownMenuHeader } from '../src/comonents/DropDownMenuHeader';

import { NoteContext, OptionsAppContext } from '../context/context';

const Stack = createStackNavigator();

export default function AboutStack() {
  const { isShowContentNotes, changeIsShowContentNotes, appColor } = useContext(OptionsAppContext);
  const { removeAllTrash } = useContext(NoteContext);

  return (
    <Stack.Navigator
      initialRouteName="TrashPage"
      screenOptions={{
        headerStyle: { backgroundColor: appColor },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="TrashPage"
        component={TrashPage}
        options={({ navigation, route }) => {
          return {
            title: 'Корзина',
            headerLeft: (props) => (
              <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                <Item title='menu' iconName='ios-menu'
                      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}/>
              </HeaderButtons>
            ),
            headerRight: (props) => (
              <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                <DropDownMenuHeader
                  ComponentTrigger={Item}
                  componentTriggerProps={{ title: 'menu', iconName: 'md-more' }}
                  menuOptions={menuTrashPade(isShowContentNotes, changeIsShowContentNotes, removeAllTrash, appColor)}
                />
              </HeaderButtons>
            ),
          }
        }
        }
      />
    </Stack.Navigator>
  );
}