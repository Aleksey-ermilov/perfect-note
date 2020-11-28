import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Button, Text, StyleSheet, FlatList, SafeAreaView, TextInput } from 'react-native';
import { HelperText, Switch } from 'react-native-paper';

import firebase from 'firebase';

import { OptionsAppContext, UserContext, NoteContext } from '../../../context/context';

import { _Button } from '../../comonents/Button';
import { CardText } from '../../comonents/CardText';

const RegPage = ({ navigation }) => {
  const { appColor } = useContext(OptionsAppContext);
  const { registration, error } = useContext(UserContext);
  const { notes, categories } = useContext(NoteContext);

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');


  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const [errorView, setErrorView] = useState({ flag: false, text: '' });

  useEffect(() => {
    setErrorView({ flag: false, text: '' });
  }, [rePass,login,email,pass]);


  const handlerButton = async () => {
    const user = {
      email: email.trim(),
      pass: pass.trim(),
      login: login.trim(),
    };
    if (isSwitchOn) {
      user.notes = notes;
      user.categories = categories;
      user.dateLastChange = new Date().getTime().toString()
    }
    if (user.pass.length < 6){
      setErrorView({ flag: true, text: 'Пароли должен состоять из не мение 6 символов' });
      return
    }
    if (rePass !== pass) {
      setErrorView({ flag: true, text: 'Пароли не совпадают' });
    } else {
      await registration(user);
      setErrorView({ flag: true, text: error });
      if (error){
        setErrorView({flag: true, text: error})
      }else {
        setLogin('')
        setEmail('')
        setPass('')
        setRePass('')
        navigation.navigate('MainStack', {
          screen: 'MainPage', params: {
            category: '1',
          },
        });
      }
      // The provided email is already in use by an existing user. Each user must have a unique email.
      // An invalid argument was provided to an Authentication method. The error message should contain additional information.
      // The provided value for the email user property is invalid. It must be a string email address.

      // The provided value for the password user property is invalid. It must be a string with at least six characters.
    }
  };

  const touchCard = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const SwitchBox = () => {
    return (
      <View pointerEvents={'none'}>
        <Switch value={isSwitchOn} color={appColor}/>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={login}
        onChangeText={text => setLogin(text)}
        style={{ ...styles.text, borderColor: appColor }}
        autoFocus={true}
        placeholder={'Логин...'}
      />
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        style={{ ...styles.text, borderColor: appColor }}
        placeholder={'Email...'}
      />
      <TextInput
        value={pass}
        onChangeText={text => setPass(text)}
        style={{ ...styles.text, borderColor: appColor }}
        placeholder={'Пароль...'}
        secureTextEntry={true}
      />
      <TextInput
        value={rePass}
        onChangeText={text => setRePass(text)}
        style={{ ...styles.text, borderColor: appColor }}
        placeholder={'Повторить пароль...'}
        secureTextEntry={true}
      />
      <CardText text={'Сохранить существующие заметки'} ComponentRight={SwitchBox} onPress={touchCard}/>
      <HelperText type="error" visible={errorView.flag}>
        {errorView.text}
      </HelperText>
      <_Button onPress={handlerButton} title={'Зарегистриваться'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 5,
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default RegPage;