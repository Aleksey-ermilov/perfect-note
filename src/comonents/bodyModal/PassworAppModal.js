import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { HelperText } from 'react-native-paper';

import { ModalContext, OptionsAppContext } from '../../../context/context';

import { _Button } from '../Button';

export const PasswordAppModal = ({ getPassword }) => {
  const { appColor } = useContext(OptionsAppContext);
  const { hiddenModal } = useContext(ModalContext);

  const [ pass, setPass ] = useState('')
  const [ rePass, setRePass ] = useState('')
  const refRePass = useRef('');

  const [ error, setError ] = useState({ flag: false, text: '' })

  useEffect(()=> {
    if (refRePass.current !== rePass){
      setError({flag: false, text: ''})
    }
  },[rePass])

  const handlerButton = () => {
    if (rePass !== pass){
      refRePass.current = rePass
      setError({flag: true, text: 'Пароли не совпадают'})
    }else{
      setError({flag: false, text: ''})
      getPassword(pass)
      hiddenModal()
    }
  }

  return (
    <View style={styles.container}>

      <TextInput
        value={pass}
        onChangeText={ text => setPass(text)}
        style={{ ...styles.text, borderColor: appColor }}
        autoFocus={true}
        placeholder={'Новый пароль...'}
        secureTextEntry={true}
      />
      <TextInput
        value={rePass}
        onChangeText={ text => setRePass(text)}
        style={{ ...styles.text, borderColor: appColor }}
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