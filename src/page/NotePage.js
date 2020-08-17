import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import ColorBottomNavigation from '../comonents/ColorBottomNavigation';

const NotePage = ({ route }) => {
  console.log('params', route.params);
  const [note, setNote] = useState({
    title: '',
    text: '',
    id: '',
    itemBackground: '',
    category: '',
  });

  useEffect(() => {
    if (route.params) {
      setNote(route.params.note);
    }
  }, []);


  return (

    <View style={styles.container}>

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
