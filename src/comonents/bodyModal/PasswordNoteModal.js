import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { HelperText } from 'react-native-paper';

import { _Button } from '../Button';

import { ModalContext, OptionsAppContext } from '../../../context/context';

export const PasswordNoteModal = ({ getPass, note }) => {
  const { appColor } = useContext(OptionsAppContext);
  const { hiddenModal } = useContext(ModalContext);

  const [ oldPass, setOldPass ] = useState('')
  const [ pass, setPass ] = useState('')
  const [ rePass, setRePass ] = useState('')

  const [ error, setError ] = useState({ flag: false, text: '' })

  useEffect(()=> {
    setError({flag: false, text: ''})
  },[rePass, pass, oldPass])


  const handlerButton = () => {
    if (note.password === oldPass){
      if (rePass !== pass){
        setError({flag: true, text: 'Пароли не совпадают'})
      }else{
        setError({flag: false, text: ''})
        getPass(pass)
        hiddenModal()
      }
    }else {
      setError({flag: true, text: 'Неверный старый пароль'})
    }
  }

  return (
    <View style={styles.container}>
      { note.password !== '' &&
        <TextInput
        value={oldPass}
        onChangeText={text => setOldPass(text)}
        style={{ ...styles.text, borderColor: appColor.appColor }}
        autoFocus={true}
        placeholder={'Старый пароль...'}
        secureTextEntry={true}
      />
      }
      <TextInput
        value={pass}
        onChangeText={ text => setPass(text)}
        style={{ ...styles.text, borderColor: appColor.appColor }}
        autoFocus={true}
        placeholder={'Новый пароль...'}
        secureTextEntry={true}
      />
      <TextInput
        value={rePass}
        onChangeText={ text => setRePass(text)}
        style={{ ...styles.text, borderColor: appColor.appColor }}
        placeholder={'Повторить пароль...'}
        secureTextEntry={true}
      />
      <HelperText type="error" visible={error.flag}>
        {error.text}
      </HelperText>
      <_Button onPress={ handlerButton } title={'Установить пароль'}/>
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