import React, { useState, useEffect, useContext } from 'react';
import { View, Button, StyleSheet, TextInput, Keyboard, TouchableOpacity, Text } from 'react-native';
import { Divider, Portal, Provider } from 'react-native-paper';
import { _Modal } from '../comonents/Modal';
import { ModalContext } from '../../context/context';

const NotePage = ({ navigation, route }) => {
  const { isVisibleModal, Component, hiddenModal } = useContext(ModalContext);
  // console.log('params', route.params);

  // const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [note, setNote] = useState({
    title: '',
    text: '',
    // id: '',
    itemBackground: '',
    category: '',
  });

  useEffect(() => {
    if (route.params) {
      setNote(route.params.note);
    }
  }, []);

  useEffect(() => {
    navigation.setParams({ note });
  }, [note]);

  return (

    <View style={styles.container}>
      <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
        <Component note={note} />
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
          style={styles.titleInput}
        />
        <Divider/>
        <TextInput
          value={note.text}
          onChangeText={text => setNote(prev => ({ ...prev, text }))}
          placeholder={'Заметка...'}
          multiline={true}
          style={styles.textInput}
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
