import React, { useContext, useState } from 'react';
import { View, Button, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { NoteContext } from '../../context/context';

import CardNote from '../comonents/CardNote';
import _SnackBar from '../comonents/_SnackBar';

const TrashPage = ({navigation}) => {
  const { notes, updateNote, removeNote } = useContext(NoteContext);

  const [snackbar, setSnackbar] = useState({});

  const pressCard = (note) => {
    // console.log('pressCard', note)
    setSnackbar({ text: 'Запись восстановлена!!!', isVisible: true });
    updateNote({ ...note, isTrash: false })
  };
  const pressLongCard = (note) => {
    // console.log('pressLongCard', note)
    removeNote(note)
  };

  const renderItem = ({ item }) => {
    return (
          <CardNote
            onPress={pressCard}
            onLongPress={pressLongCard}
            note={item}
          />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <_SnackBar
        setSnackbar={setSnackbar}
        snackbar={snackbar}
      />
      {
        notes.filter( note => note.isTrash ).length !== 0 ?
          <FlatList
            data={notes.filter( note => note.isTrash )}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
          :
          <View style={styles.noNotes}>
            <Text>Пока нет ни каких заметок</Text>
          </View>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noNotes:{
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  }
});

export default TrashPage;