import React, { useContext, useState } from 'react';
import { View, Button, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

import { NoteContext } from '../../context/context';

import CardNote from '../comonents/CardNote';
import _SnackBar from '../comonents/_SnackBar';

const TrashPage = ({navigation}) => {
  const { trash, reestablishTrash, removeTrash } = useContext(NoteContext);

  const [snackbar, setSnackbar] = useState({});

  const pressCard = (note) => {
    // console.log('pressCard', note)
    setSnackbar({ text: 'Запись восстановлена!!!', isVisible: true });
    reestablishTrash(note)
  };
  const pressLongCard = (note) => {
    // console.log('pressLongCard', note)
    removeTrash(note)
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
      <_SnackBar
        setSnackbar={setSnackbar}
        snackbar={snackbar}
      />
      {
        trash.length !== 0 ?
          <FlatList
            data={trash}
            renderItem={renderItem}
            keyExtractor={item => item.id}
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