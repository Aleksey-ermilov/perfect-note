import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Button, Text, StyleSheet, FlatList } from 'react-native';
// import { FAB, Portal, Provider } from 'react-native-paper';

import { DrawerActions } from '@react-navigation/native';

import CardNote from '../comonents/CardNote';
import { NoteContext } from '../../context/context';
import { colors } from '../../theme';
import _Fab from '../comonents/Fab';
import { data } from '../../data';

const MainPage = ({ navigation }) => {
  const { notes, addNote } = useContext(NoteContext);
  const emptyNotes = []

  const pressCard = (note) => {
    console.log('note', note);
    navigation.push('NotePage', { note })
  };
  const pressLongCard = (note) => {
    console.log('remove', note);
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
    // padding: 10,
    flex: 1
  },
  noNotes:{
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  }
});

export default MainPage;

/*<View style={styles.container}>
<Text>Main Page</Text>

<Button
title="Toggle drawer"
onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
/>
<Button
title="push createPage"
onPress={() => navigation.push('CreatePage')}
/>

</View>*/
