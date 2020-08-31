import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet, FlatList } from 'react-native';

import CardNote from '../comonents/CardNote';
import _Fab from '../comonents/Fab';

import { NoteContext } from '../../context/context';

const MainPage = ({ navigation }) => {
  const { notes, removeNote, selectedNote } = useContext(NoteContext);

  const createNote = () => {
    navigation.push('NotePage')
  }
  const pressCard = (note) => {
    selectedNote(note)
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
        notes.length !== 0 ?
          <FlatList
            data={notes}
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


