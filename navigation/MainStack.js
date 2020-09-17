import React, { useContext } from 'react';
import { DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MainPage from '../src/page/MainPage';
import NotePage from '../src/page/NotePage';

import { HeaderIcon } from '../src/comonents/HeaderIcon';
import { DropDownMenuHeader } from '../src/comonents/DropDownMenuHeader';

import { colors } from '../theme';
import { ModalContext, NoteContext, OptionsAppContext } from '../context/context';

import { menuMainPade } from '../src/comonents/configDropDownMenu/menuMainPage';
import { menuNotePage } from '../src/comonents/configDropDownMenu/menuNotePage';

const Stack = createStackNavigator();

export default function MainStack({ navigation, route }) {
  const { isShowContentNotes, changeIsShowContentNotes } = useContext(OptionsAppContext);
  const { addNote, updateNote, removeNote } = useContext(NoteContext);
  const { showModal } = useContext(ModalContext);
  // console.log('MainStackProps',route.params.notes);
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
                  menuOptions={menuMainPade(isShowContentNotes, changeIsShowContentNotes)}
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
            title: 'Редактировать/Создать',
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
                  menuOptions={menuNotePage(showModal, removeNote, route, navigation)}
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