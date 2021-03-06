import React, { useContext } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { HeaderIcon } from '../src/comonents/HeaderIcon';

import MainPage from '../src/page/MainPage';
import NotePage from '../src/page/NotePage';

import { DropDownMenuHeader } from '../src/comonents/DropDownMenuHeader';

import { colors } from '../theme';
import { ModalContext, NoteContext, OptionsAppContext } from '../context/context';

import { menuMainPade } from '../src/comonents/configDropDownMenu/menuMainPage';
import { menuNotePage } from '../src/comonents/configDropDownMenu/menuNotePage';

const Stack = createStackNavigator();

export default function MainStack({ navigation, route }) {
  const { isShowContentNotes, changeIsShowContentNotes, typeNote, changeTypeNote } = useContext(OptionsAppContext);
  const { addNote, updateNote } = useContext(NoteContext);
  const { showModal } = useContext(ModalContext);
  const { appColor } = useContext(OptionsAppContext);

  return (
    <Stack.Navigator
      initialRouteName="MainPage"
      screenOptions={{
        headerStyle: { backgroundColor: appColor.appColor },
        headerTintColor: appColor.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        initialParams={{ notes: route.params.notes, category: route.params.category }}
        options={({ navigation, route }) => {
          return {
            title: 'Заметки',
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
                  menuOptions={menuMainPade(showModal, isShowContentNotes, changeIsShowContentNotes, appColor)}
                />
              </HeaderButtons>
            ),
          };
        }
        }
      />
      <Stack.Screen
        name="NotePage"
        component={NotePage}
        options={({ navigation, route }) => {
          return ({
            title: 'Создать',
            headerRight: (props) => (
              <HeaderButtons HeaderButtonComponent={HeaderIcon}>
                <Item title='menu' iconName='ios-checkmark' onPress={() => {
                  const note = route.params.note;
                  if (note.id) {
                    navigation.goBack();
                    updateNote(note);
                  } else {
                    navigation.goBack();
                    addNote(note);
                  }
                }
                }/>
                <DropDownMenuHeader
                  ComponentTrigger={Item}
                  componentTriggerProps={{ title: 'menu', iconName: 'md-more' }}
                  menuOptions={menuNotePage(showModal, updateNote, route, navigation, typeNote, changeTypeNote)}
                />
              </HeaderButtons>
            ),
          });
        }
        }
      />
    </Stack.Navigator>
  );
}