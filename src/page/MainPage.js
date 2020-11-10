import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet, FlatList } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';

import { _Modal } from '../comonents/Modal';

import _SnackBar from '../comonents/_SnackBar';

import CardNote from '../comonents/CardNote';
import _Fab from '../comonents/Fab';

import { ModalContext, NoteContext, OptionsAppContext } from '../../context/context';

import { compareNotes } from '../../helpers';
import { sortArray } from '../../theme';
import { RadioListModal } from '../comonents/bodyModal/RadioListModal';

const MainPage = ({ navigation, route }) => {
  const { notes, updateNote } = useContext(NoteContext);
  const { changeTypeNote, sortNotes, setSortNote } = useContext(OptionsAppContext);
  const { isVisibleModal, Component, hiddenModal } = useContext(ModalContext);

  const [snackbar, setSnackbar] = useState({});

  const [ notesCategory, setNotesCategory ] = useState([])

  const { category } = route.params

  useEffect(() => {
    const sortedNotes = compareNotes(notes, sortNotes.id)

    if (category === '1'){
      setNotesCategory(sortedNotes)
    }else {
      setNotesCategory( sortedNotes.filter(note => note.category === category) )
    }

  },[category,notes,sortNotes])

  const selectorModal = () => {
    if (Component === 'SortModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <RadioListModal dataList={sortArray} getValue={getSort} selected={sortNotes} />
        </_Modal>
      );
    }
  };
  const getSort = (sort) => {
    setSortNote(sort);
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
    updateNote({ ...item, isTrash: true})
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
            // removeNote(item) // add trash
            updateNote({ ...item, isTrash: true})
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
        notesCategory.filter( note => !note.isTrash ).length !== 0 ?
          <FlatList
            data={notesCategory.filter( note => !note.isTrash )}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
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
