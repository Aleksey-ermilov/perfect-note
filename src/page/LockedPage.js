import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { OptionsAppContext } from '../../context/context';

import { _Button } from '../comonents/Button';
import _SnackBar from '../comonents/_SnackBar';

import { colors } from '../../theme';

const LockedPage = ({ navigation }) => {
  const { appPassword, setIsAuth, appColor } = useContext(OptionsAppContext);

  const [snackbar, setSnackbar] = useState({});

  const [ pin, setPin ] = useState('')
  const [ pass, setPass ] = useState('')

  const handlerLogin = () => {
    if (appPassword.type === 'pin'){
      if (appPassword.password === pin){
        setIsAuth(true)
      }else {
        setSnackbar({ text: 'PIN-код введён неверный', isVisible: true, color: colors.warning });
      }
    }
    if (appPassword.type === 'pass'){
      if (appPassword.password === pass){
        setIsAuth(true)
      }else {
        setSnackbar({ text: 'Пароль введён неверный', isVisible: true, color: colors.warning });
      }
    }
  }

  return (
    <View style={styles.container}>
      <_SnackBar
        setSnackbar={setSnackbar}
        snackbar={snackbar}
      />
      { appPassword.type === 'pin' ?
        <TextInput
          value={pin}
          onChangeText={ text => setPin(text)}
          style={{ ...styles.text, borderColor: appColor.appColor }}
          autoFocus={true}
          placeholder={'PIN-код...'}
          secureTextEntry={true}
          maxLength={4}
          keyboardType={'number-pad'}
        />
        :
        <TextInput
        value={pass}
        onChangeText={ text => setPass(text)}
        style={{ ...styles.text, borderColor: appColor.appColor }}
        autoFocus={true}
        placeholder={'Пароль...'}
        secureTextEntry={true}
        />
      }

      <_Button onPress={handlerLogin} title={'Войти'} styleContainer={{width: '30%',height:50}}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    borderWidth:1,
    borderRadius:10,
    margin:5,
    padding:10,
    fontSize:16,
    width:'75%',
  }
});

export default LockedPage;
