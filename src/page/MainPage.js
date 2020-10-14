import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet, FlatList } from 'react-native';

import { _Modal } from '../comonents/Modal';
import { SortModal } from '../comonents/bodyModal/SortModal';

import CardNote from '../comonents/CardNote';
import _Fab from '../comonents/Fab';

import { ModalContext, NoteContext, OptionsAppContext } from '../../context/context';

import { compareNotes } from '../../helpers';
import { sortArray } from '../../theme';

const MainPage = ({ navigation, route }) => {
  const { notes, removeNote } = useContext(NoteContext);
  const { changeTypeNote } = useContext(OptionsAppContext);
  const { isVisibleModal, Component, hiddenModal } = useContext(ModalContext);

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
      return <SortModal getSort={getSort} sort={sort}/>;
    }
  };
  const getSort = (sort) => {
    setSort(sort);
  };

  const createNote = (type) => {
    console.log('type new note', type)
    changeTypeNote(type)
    navigation.push('NotePage', { type })
  }
  const pressCard = (note) => {
    // selectedNote(note)
    changeTypeNote(note.type)
    navigation.push('NotePage', { note })
  };
  const pressLongCard = (note) => {
    removeNote(note)
  };

  const renderItem = ({ item }) => {
    return (
      <CardNote
        onPress={pressCard}
        onLongPress={pressLongCard}
        note={item}
        key={item.id}
      />
      )
  }

  return (
    <SafeAreaView style={styles.container}>
      <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
        {selectorModal()}
      </_Modal>
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


