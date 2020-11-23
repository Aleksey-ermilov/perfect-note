import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { HelperText } from 'react-native-paper';

import { ModalContext, OptionsAppContext } from '../../../context/context';

import { _Button } from '../Button';

export const LoginModal = ({ push }) => {
  const { appColor } = useContext(OptionsAppContext);
  const { hiddenModal } = useContext(ModalContext);

  const [ email, setEmail ] = useState('')
  const [ pass, setPass ] = useState('')
  const refPass = useRef('');

  const [ error, setError ] = useState({ flag: false, text: '' })

  // useEffect(()=> {
  //   if (refPass.current !== pass){
  //     setError({flag: false, text: ''})
  //   }
  // },[pass])

  const handlerButtonLogin = () => {
    // refPass.current = pass
    // setError({flag: true, text: 'Пароли не совпадают'})
    hiddenModal()

  }

  const handlerButtonRegistration = () => {
    hiddenModal()
    push()
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems:'flex-end',paddingVertical:5}}>
        {/*<_Button onPress={handlerButtonRegistration} title={'Зарегистрироваться'} />*/}
        <TouchableOpacity onPress={handlerButtonRegistration} >
          <Text style={{color: appColor, fontSize: 15}}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={email}
        onChangeText={ text => setEmail(text)}
        style={{ ...styles.text, borderColor: appColor }}
        autoFocus={true}
        placeholder={'Email...'}
      />
      <TextInput
        value={pass}
        onChangeText={ text => setPass(text)}
        style={{ ...styles.text, borderColor: appColor }}
        placeholder={'Пароль...'}
        secureTextEntry={true}
      />
      <HelperText type="error" visible={error.flag}>
        {error.text}
      </HelperText>

      <_Button onPress={handlerButtonLogin} title={'Войти'} />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    // height: 330,

  },
  text: {
    borderWidth:1,
    borderRadius:10,
    margin:5,
    padding:10,
    fontSize:16,
  }
});