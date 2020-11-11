import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { HelperText } from 'react-native-paper';

import { _Button } from '../Button';

import { ModalContext, OptionsAppContext } from '../../../context/context';

export const CheckPasswordNoteModal = ({ getCheckPass }) => {
  const { appColor } = useContext(OptionsAppContext);
  const { hiddenModal } = useContext(ModalContext);

  const [ pass, setPass ] = useState('')

  const handlerButton = () => {
    getCheckPass(pass)
    hiddenModal()
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={pass}
        onChangeText={ text => setPass(text)}
        style={{ ...styles.text, borderColor: appColor }}
        autoFocus={true}
        placeholder={'Пароль...'}
        secureTextEntry={true}
      />
      <_Button onPress={ handlerButton } title={'Войти'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  text: {
    borderWidth:1,
    borderRadius:10,
    margin:5,
    padding:10,
    fontSize:16,
  }
});