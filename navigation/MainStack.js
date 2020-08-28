import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MainPage from '../src/page/MainPage';
import NotePage from '../src/page/NotePage';

import { ColorModal } from '../src/comonents/bodyModal/ColorModal';

import { HeaderIcon } from '../src/comonents/HeaderIcon';
import { DropDownMenuHeader } from '../src/comonents/DropDownMenuHeader';

import { colors } from '../theme';
import { ModalContext, NoteContext } from '../context/context';

const Stack = createStackNavigator();

export default function MainStack() {
  const { addNote, updateNote, removeNote } = useContext(NoteContext);
  const { showModal } = useContext(ModalContext);

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
        options={({ navigation, route }) => {
          const menuMainPade = [
            { onPress: () => console.log('Список'), text: 'Сортировка' },
            { onPress: () => console.log('Показать содержимое'), text: 'Показать содержимое' },
            { onPress: () => console.log('Плитка'), text: 'Плитка' },
          ]
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
                  menuOptions={menuMainPade}
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
          const menuNotePade = [
            { onPress: () => console.log('Список'), text: 'Список' },
            { text: 'Изменить цвет', onPress: () => {
                console.log('Изменить цвет')
                showModal(ColorModal)
              },
            },
            { onPress: () => console.log('Напоминание'), text: 'Напоминание' },
            { onPress: () => console.log('Добавить изображение'), text: 'Добавить изображение' },
            {
              text: 'Удалить', onPress: () => {
                const note = route.params.note;
                if (note.id) {
                  navigation.goBack();
                  removeNote(note);
                } else {
                  navigation.goBack();
                }
              },
            },
          ];
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
                  menuOptions={menuNotePade}
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