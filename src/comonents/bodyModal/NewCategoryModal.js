import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { _Button } from '../Button';

import { colors } from '../../../theme';

export const NewCategoryModal = ({ hiddenModal, getText }) => {
  const [ value, setValue ] = useState('')

  const handlerButton = () => {
    getText(value)
    hiddenModal()
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={ text => setValue(text)}
        style={styles.text}
        autoFocus={true}
        placeholder={'Категория...'}
      />
      <_Button onPress={ handlerButton } title={'Добавить категорию'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  text: {
    borderColor: colors.mainColor,
    borderWidth:1,
    borderRadius:10,
    margin:5,
    padding:10,
    fontSize:16,
  }
});