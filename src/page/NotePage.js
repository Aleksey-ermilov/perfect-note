import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import { Divider, Text } from 'react-native-paper';

import { _Modal } from '../comonents/Modal';
import { ColorModal } from '../comonents/bodyModal/ColorModal';
import { CategoryModal } from '../comonents/bodyModal/CategoriesModal';

import { ModalContext, OptionsAppContext } from '../../context/context';

import { CheckBox } from '../comonents/CheckBox';

import { noteColors } from '../../theme';

const NotePage = ({ navigation, route }) => {
  const { isVisibleModal, Component, hiddenModal } = useContext(ModalContext);
  const { typeNote, appColor, fontFamily, fontSize } = useContext(OptionsAppContext);

  const [note, setNote] = useState({
    title: '',
    text: [{ content: ``, completed: false, id: '1' }],
    // id: '',
    itemBackground: '#fff',
    category: 'all',
    date: new Date().toString(),
    // type: route.params.type,
    type: typeNote,
    password:'',
  });

  useEffect(() => {
    if (route.params.note) {
      navigation.setOptions({ title: 'Редактировать' })
      setNote(route.params.note);
    }else{
      setNote( prev => ({ ...prev, category: route.params.category }));
    }
  }, []);

  useEffect(() => {
    navigation.setParams({ note });
  }, [note]);
  useEffect(() => {
    setNote(prev => ({ ...prev, type: typeNote }));
  }, [typeNote]);

  const selectorModal = () => {
    if (Component === 'ColorModal') {
      return(
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <ColorModal getColor={getColor} listColors={noteColors}/>
        </_Modal>
      );
    }
    if (Component === 'CategoryModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <CategoryModal note={note} getCategory={getCategory}/>
        </_Modal>
      );
    }
  };

  const getColor = (color) => {
    setNote(prev => ({ ...prev, itemBackground: color }));
  };
  const getCategory = (category) => {
    console.log('getCategory', category);
    setNote(prev => ({ ...prev, category: category }));
  };

  const handlerOnChangeTextTypeText = text => {
    const str = text.split('\n').map(item => ({ content: item, completed: false }));
    setNote(prev => ({ ...prev, text: str }));
  };
  const handlerOnChangeTextTypeList = (text, id) => {
    setNote(prev => ({
      ...prev,
      text: [
        ...prev.text.map(item => {
          if (item.id === id) {
            item.content = text;
          }
          return item;
        })
      ]
    }) )
  };

  const handlerChecked = (id) => {
    console.log(id, 'id');
    setNote(prev => ({
      ...prev,
      text: [
        ...prev.text.map( item => {
          if(item.id === id){
            item.completed = !item.completed;
          }
          return item
        })
      ]
    }) )
}
const handlerRemoveCheckBox = id => {
  setNote(prev => ({
    ...prev,
    text: [
      ...prev.text.filter(item => item.id !== id),
    ],
  }));
};
const handlerAddCheckBox = () => {
  if (!(note.text[note.text.length - 1].content.trim() === '')) {
    setNote(prev => ({
      ...prev,
      text: [
        ...prev.text, { content: ``, completed: false, id: new Date().toString() },
      ],
    }));
  }
};

let text = note.text.map(item => item.content).join('\n');

return (
  <View style={{ ...styles.container, backgroundColor: note.itemBackground }}>

    {selectorModal()}

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
        style={{ ...styles.titleInput, backgroundColor: note.itemBackground, fontFamily: fontFamily.id, fontSize: (+fontSize.id + 6) }}
      />
      <Divider style={{ backgroundColor: appColor }}/>
      {note.type === 'text' ?
        <TextInput
          value={text}
          onChangeText={text => handlerOnChangeTextTypeText(text)}
          placeholder={'Заметка...'}
          multiline={true}
          style={{ ...styles.textInput, backgroundColor: note.itemBackground, fontFamily: fontFamily.id, fontSize: +fontSize.id }}
          autoFocus={true}
        />
        :
        <ScrollView>
          <CheckBox
            note={note}
            onChangeText={handlerOnChangeTextTypeList}
            onChecked={handlerChecked}
            removeCheckBox={handlerRemoveCheckBox}
            addCheckBox={handlerAddCheckBox}
          />
        </ScrollView>
      }
    </TouchableOpacity>
  </View>
);
}
;

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