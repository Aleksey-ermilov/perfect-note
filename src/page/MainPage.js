import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet, FlatList } from 'react-native';

import CardNote from '../comonents/CardNote';
import { NoteContext } from '../../context/context';
import { colors } from '../../theme';
import _Fab from '../comonents/Fab';

const MainPage = ({ navigation }) => {
  const { notes, removeNote } = useContext(NoteContext);
  const emptyNotes = []

  const pressCard = (note) => {
    // console.log('note', note);
    navigation.push('NotePage', { note })
  };
  const pressLongCard = (note) => {
    // console.log('remove', note);
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


