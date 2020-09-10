import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';

import { _Modal } from '../comonents/Modal';

import { ModalContext } from '../../context/context';

const NotePage = ({ navigation, route }) => {
  const { isVisibleModal, Component, hiddenModal } = useContext(ModalContext);

  const [note, setNote] = useState({
    title: '',
    text: '',
    // id: '',
    itemBackground: '#fff',
    category: 'all',
  });

  useEffect(() => {
    if (route.params) {
      setNote(route.params.note);
    }
  }, []);

  useEffect(() => {
    navigation.setParams({ note });
  }, [note]);

  const getColor = (color) => {
    setNote(prev => ({ ...prev, itemBackground: color }))
  }
  const getCategory = (category) => {
    console.log('getCategory',category);
    setNote(prev => ({ ...prev, category: category }))
  }

  return (
    <View style={{ ...styles.container, backgroundColor: note.itemBackground }}>
      <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
        <Component
          note={note}
          getColor={getColor}
          getCategory={getCategory}
        />
      </_Modal>
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}
      >
        <TextInput
          value={note.title}
          onChangeText={text => setNote(prev => ({ ...prev, title: text }))}
          placeholder={'Заголовок'}
          multiline={true}
          style={{ ...styles.titleInput,  backgroundColor: note.itemBackground }}
        />
        <Divider/>
        <TextInput
          value={note.text}
          onChangeText={text => setNote(prev => ({ ...prev, text }))}
          placeholder={'Заметка...'}
          multiline={true}
          style={{ ...styles.textInput, backgroundColor: note.itemBackground }}
          autoFocus={true}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleInput: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  textInput: {
    fontSize: 16,
    padding: 10,
  },
});

export default NotePage;
