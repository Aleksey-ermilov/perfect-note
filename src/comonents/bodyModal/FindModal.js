import React, { useContext, useState,useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { ModalContext, OptionsAppContext } from '../../../context/context';

import { _Button } from '../Button';

export const FindModal = ({ getValue }) => {
  const { appColor } = useContext(OptionsAppContext);
  const { hiddenModal } = useContext(ModalContext);

  const [ value, setValue ] = useState('')

  const buttonHandler = () => {
    hiddenModal()
  }

  const inputHandler = text => {
    getValue(text)
    setValue(text)
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={inputHandler}
        style={{ ...styles.text, borderColor: appColor.appColor }}
        autoFocus={true}
        placeholder={'Найти...'}
      />
      <_Button onPress={buttonHandler} title={'Закрыть'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    // height: 330, // Высота flatList и всей модалки
    // backgroundColor: 'white',
  },
  text: {
    borderWidth:1,
    borderRadius:10,
    margin:5,
    padding:10,
    fontSize:16,
  }
});