import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet, FlatList } from 'react-native';

import CardNote from '../comonents/CardNote';
import _Fab from '../comonents/Fab';

import { NoteContext, OptionsAppContext } from '../../context/context';

const MainPage = ({ navigation, route }) => {
  const { notes, removeNote, selectedNote } = useContext(NoteContext);
  const { changeTypeNote } = useContext(OptionsAppContext);

  const [ notesCategory, setNotesCategory ] = useState([])

  const { category } = route.params

  useEffect(() => {
    if (category === 'all'){
      setNotesCategory(notes)
    }else {
      setNotesCategory( notes.filter(note => note.category === category) )
    }

  },[category,notes])

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


