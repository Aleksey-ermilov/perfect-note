import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import { Divider, Text } from 'react-native-paper';

import { _Modal } from '../comonents/Modal';
import { ColorModal } from '../comonents/bodyModal/ColorModal';
import { CategoryModal } from '../comonents/bodyModal/CategoriesModal';

import { ModalContext, OptionsAppContext } from '../../context/context';

import { CheckBox } from '../comonents/CheckBox';

const NotePage = ({ navigation, route }) => {
  const { isVisibleModal, Component, hiddenModal } = useContext(ModalContext);
  const { typeNote } = useContext(OptionsAppContext);

  const [note, setNote] = useState({
    title: '',
    text: [{ content: ``, completed: false, id: '1' }],
    // id: '',
    itemBackground: '#fff',
    category: 'all',
    date: new Date(),
    // type: route.params.type,
    type: typeNote,
  });

  useEffect(() => {
    if (route.params.note) {
      setNote(route.params.note);
    }
  }, []);

  useEffect(() => {
    navigation.setParams({ note });  //setOptions
  }, [note]);
  useEffect(() => {
    setNote(prev => ({ ...prev, type: typeNote }));
  }, [typeNote]);

  const selectorModal = () => {
    if (Component === 'ColorModal') {
      return <ColorModal note={note} getColor={getColor}/>;
    }
    if (Component === 'CategoryModal') {
      return <CategoryModal note={note} getCategory={getCategory}/>;
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
    // const changedItem = note.text.find( (item,index ) => (index + 1) === id )
    // setNote(prev => ({ ...prev, text: [...prev.text.slice(0,id-1), { ...changedItem, content: text }, ...prev.text.slice(id) ] }) )

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

    // setNote(prev => {
    //     prev.text.map(item => {
    //       if (item.id === id) {
    //         item.content = text;
    //       }
    //       return item;
    //     });
    //     return prev;
    //   },
    // );
  };

  const handlerChecked = (id) => {
    // const changedItem = note.text.find( (item,index ) => (index + 1) === id )
    // setNote(prev => ({
    //   ...prev,
    //   text: [
    //     ...prev.text.slice(0,id-1), { ...changedItem, completed: !changedItem.completed }, ...prev.text.slice(id)
    //   ]
    // }) )
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
  // setNote(prev => ({
  //   ...prev,
  //   text: [
  //     ...prev.text.filter( (item, index) => index !== id )
  //   ]
  // }) )

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

// console.log('note.text.split(\'\\n\')', note.text.split('\n').map(item => item.trim()));
// console.log('note',note);
console.log('type note', typeNote);
let text = note.text.map(item => item.content).join('\n');

return (
  <View style={{ ...styles.container, backgroundColor: note.itemBackground }}>
    <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
      {selectorModal()}
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
        style={{ ...styles.titleInput, backgroundColor: note.itemBackground }}
      />
      <Divider/>
      {note.type === 'text' ?
        <TextInput
          value={text}
          onChangeText={text => handlerOnChangeTextTypeText(text)}
          placeholder={'Заметка...'}
          multiline={true}
          style={{ ...styles.textInput, backgroundColor: note.itemBackground }}
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