import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet, FlatList } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';

import { _Modal } from '../comonents/Modal';
import { SortModal } from '../comonents/bodyModal/SortModal';

import _SnackBar from '../comonents/_SnackBar';

import CardNote from '../comonents/CardNote';
import _Fab from '../comonents/Fab';

import { ModalContext, NoteContext, OptionsAppContext } from '../../context/context';

import { compareNotes } from '../../helpers';
import { sortArray } from '../../theme';

const MainPage = ({ navigation, route }) => {
  const { notes, addTrash } = useContext(NoteContext);
  const { changeTypeNote } = useContext(OptionsAppContext);
  const { isVisibleModal, Component, hiddenModal } = useContext(ModalContext);

  const [snackbar, setSnackbar] = useState({});

  const [ notesCategory, setNotesCategory ] = useState([])
  const [ sort, setSort] = useState(sortArray[0].id)

  const { category } = route.params

  useEffect(() => {
    const sortedNotes = compareNotes(notes, sort)

    if (category === 'all'){
      setNotesCategory(sortedNotes)
    }else {
      setNotesCategory( sortedNotes.filter(note => note.category === category) )
    }

  },[category,notes,sort])

  const selectorModal = () => {
    if (Component === 'SortModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <SortModal getSort={getSort} sort={sort}/>
        </_Modal>
      );
    }
  };
  const getSort = (sort) => {
    setSort(sort);
  };

  const createNote = (type) => {
    console.log('type new note', type)
    changeTypeNote(type)
    navigation.push('NotePage', { type, category })
  }
  const pressCard = (note) => {
    changeTypeNote(note.type)
    navigation.push('NotePage', { note })
  };
 /* const pressLongCard = (note) => {
    // removeNote(note)
    addTrash(note)
  };*/

  const renderItem = ({ item }) => {
    let menu
    return (
      <Menu renderer={renderers.Popover}  ref={c => menu = c } >
        <MenuTrigger triggerOnLongPress={true}  >
          <CardNote
            onPress={pressCard}
            onLongPress={(note) => menu.open() }
            note={item}
          />
        </MenuTrigger>
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption text="Установить пароль" onSelect={() => console.log('Установить пароль')} />
          <MenuOption text="Добавить в корзину" onSelect={() => {
            setSnackbar({ text: 'Запись добавлена в корзину', isVisible: true });
            addTrash(item)
          }} />
        </MenuOptions>
      </Menu>
      )
  }

  return (
    <SafeAreaView style={styles.container}>

      {selectorModal()}

      <_SnackBar
        setSnackbar={setSnackbar}
        snackbar={snackbar}
      />

      {
        notesCategory.length !== 0 ?
          <FlatList
            data={notesCategory}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
           :
          <View style={styles.noNotes}>
            <Text>Пока нет ни каких заметок</Text>
          </View>
      }
      <_Fab
        navigation={navigation}
        createNote={createNote}
      />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  noNotes:{
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  }
});

export default MainPage;

const optionsStyles = {
  optionsContainer: {
    // padding:10
  },
  optionsWrapper: {},
  optionWrapper: {
    margin: 5,
  },
  optionTouchable: {},
  optionText: {
    fontSize:16

  },
};
