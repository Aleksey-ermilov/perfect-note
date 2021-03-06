import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { HelperText } from 'react-native-paper';

import { ModalContext, OptionsAppContext, UserContext } from '../../../context/context';

import { _Button } from '../Button';

export const LoginModal = ({ push }) => {
  const { appColor } = useContext(OptionsAppContext);
  const { hiddenModal } = useContext(ModalContext);
  const { login, error } = useContext(UserContext)

  const [ email, setEmail ] = useState('')
  const [ pass, setPass ] = useState('')

  const [ errorView, setErrorView ] = useState({ flag: false, text: '' })

  useEffect(()=> {
    setErrorView({flag: false, text: ''})
  },[email, pass])

  const handlerButtonLogin = async () => {
    await login(email.trim(),pass.trim())
    if (error){
      setErrorView({flag: true, text: error})
    }else {
      hiddenModal()
    }
  }

  const handlerButtonRegistration = () => {
    hiddenModal()
    push()
  }

  return (
    <View style={styles.container}>
      <View style={{alignItems:'flex-end',paddingVertical:5}}>
        <TouchableOpacity onPress={handlerButtonRegistration} >
          <Text style={{color: appColor.appColor, fontSize: 15}}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        value={email}
        onChangeText={ text => setEmail(text)}
        style={{ ...styles.text, borderColor: appColor.appColor }}
        autoFocus={true}
        placeholder={'Email...'}
      />
      <TextInput
        value={pass}
        onChangeText={ text => setPass(text)}
        style={{ ...styles.text, borderColor: appColor.appColor }}
        placeholder={'Пароль...'}
        secureTextEntry={true}
      />
      <HelperText type="error" visible={errorView.flag}>
        {errorView.text}
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