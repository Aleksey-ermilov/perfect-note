import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';

import { _Modal } from '../comonents/Modal';
import { RadioListModal } from '../comonents/bodyModal/RadioListModal';
import { PasswordNoteModal } from '../comonents/bodyModal/PasswordNoteModal';
import { CheckPasswordNoteModal } from '../comonents/bodyModal/CheckPasswordNoteModal';

import _SnackBar from '../comonents/_SnackBar';

import CardNote from '../comonents/CardNote';
import _Fab from '../comonents/Fab';

import { ModalContext, NoteContext, OptionsAppContext } from '../../context/context';

import { compareNotes } from '../../helpers';
import { sortArray } from '../../theme';

const MainPage = ({ navigation, route }) => {
  const { notes, updateNote } = useContext(NoteContext);
  const { loading, appColor, changeTypeNote, sortNotes, setSortNote } = useContext(OptionsAppContext);
  const { isVisibleModal, showModal, Component, hiddenModal } = useContext(ModalContext);

  const [snackbar, setSnackbar] = useState({});
  const [ selectedNote, setSelectedNote] = useState()
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
    if (Component === 'PasswordModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <PasswordNoteModal getPass={getPass} note={selectedNote} />
        </_Modal>
      );
    }
    if (Component === 'CheckPasswordNoteModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <CheckPasswordNoteModal getCheckPass={getCheckPass}/>
        </_Modal>
      );
    }
  };
  const getSort = (sort) => {
    setSortNote(sort);
  };
  const getPass = (pass) => {
    // console.log('pass',pass);
    // console.log('selected note', selectedNote.title)
    updateNote({...selectedNote, password: pass})
  };
  const getCheckPass = (pass) => {
    if (selectedNote.password === pass){
      changeTypeNote(selectedNote.type)
      navigation.push('NotePage', { note: selectedNote })
    }
  };

  const createNote = (type) => {
    console.log('type new note', type)
    changeTypeNote(type)
    navigation.push('NotePage', { type, category })
  }
  const pressCard = (note) => {
    setSelectedNote(note)
    if (note.password.trim() === ''){
      changeTypeNote(note.type)
      navigation.push('NotePage', { note })
    }else {
      showModal('CheckPasswordNoteModal');
    }
  };

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
          <MenuOption text="Установить пароль" onSelect={() => {
            showModal('PasswordModal');
            setSelectedNote(item)
          }} />
          <MenuOption text="Добавить в корзину" onSelect={() => {
            updateNote({ ...item, isTrash: true})
            setSnackbar({ text: 'Запись добавлена в корзину', isVisible: true });
            // removeNote(item) // add trash
          }} />
        </MenuOptions>
      </Menu>
      )
  }

  if (loading) return <View style={styles.noNotes}><ActivityIndicator animating={true} size={'large'} color={appColor} /></View>

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
