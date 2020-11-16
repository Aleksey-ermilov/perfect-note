import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { HelperText } from 'react-native-paper';

import { ModalContext, OptionsAppContext } from '../../../context/context';

import { _Button } from '../Button';

export const PinPasswordAppModal = ({ getPinPassword }) => {
  const { appColor } = useContext(OptionsAppContext);
  const { hiddenModal } = useContext(ModalContext);

  const [ pass, setPass ] = useState('')
  const [ rePass, setRePass ] = useState('')
  const refPass = useRef('');
  const refRePass = useRef('');

  const [ error, setError ] = useState({ flag: false, text: '' })

  useEffect(()=> {
    if (refPass.current !== pass){
      setError({flag: false, text: ''})
    }
    if (refRePass.current !== rePass){
      setError({flag: false, text: ''})
    }
  },[pass,rePass])

  const handlerButton = () => {
    refPass.current = pass
    if (pass.length < 4){
      setError({flag: true, text: 'Должно быть 4 цифры'})
      return
    }
    if (rePass !== pass){
      refRePass.current = rePass
      setError({flag: true, text: 'Пароли не совпадают'})
    }else{
      setError({flag: false, text: ''})
      getPinPassword(pass)
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
        placeholder={'PIN-код...'}
        secureTextEntry={true}
        maxLength={4}
        keyboardType={'number-pad'}
      />
      <TextInput
        value={rePass}
        onChangeText={ text => setRePass(text)}
        style={{ ...styles.text, borderColor: appColor }}
        placeholder={'Повторить PIN-код...'}
        secureTextEntry={true}
        maxLength={4}
        keyboardType={'number-pad'}
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