import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Button, Text, StyleSheet, FlatList, SafeAreaView, TextInput } from 'react-native';
import { HelperText, Switch } from 'react-native-paper';

import { OptionsAppContext, UserContext } from '../../../context/context';

import { _Button } from '../../comonents/Button';
import { CardText } from '../../comonents/CardText';

const RegPage = ({ navigation }) => {
  const { appColor } = useContext(OptionsAppContext);
  const {  } = useContext(UserContext)

  const [ login, setLogin ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ pass, setPass ] = useState('')
  const [ rePass, setRePass ] = useState('')
  const refRePass = useRef('');

  const [isSwitchOn, setIsSwitchOn] = useState(true );

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
        console.log('регистрация')
        // navigation.navigate('MainStack', {
        //   screen: 'MainPage', params: {
        //     category: '1',
        //   },
        // });
      }
  }

  const touchCard = () => { setIsSwitchOn(!isSwitchOn) };

  const SwitchBox = () => {
    return (
    <View pointerEvents={'none'}>
      <Switch value={isSwitchOn}  color={appColor}/>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={login}
        onChangeText={ text => setLogin(text)}
        style={{ ...styles.text, borderColor: appColor }}
        autoFocus={true}
        placeholder={'Логин...'}
      />
      <TextInput
        value={email}
        onChangeText={ text => setEmail(text)}
        style={{ ...styles.text, borderColor: appColor }}
        placeholder={'Email...'}
      />
      <TextInput
        value={pass}
        onChangeText={ text => setPass(text)}
        style={{ ...styles.text, borderColor: appColor }}
        placeholder={'Пароль...'}
        secureTextEntry={true}
      />
      <TextInput
        value={rePass}
        onChangeText={ text => setRePass(text)}
        style={{ ...styles.text, borderColor: appColor }}
        placeholder={'Повторить пароль...'}
        secureTextEntry={true}
      />
      <CardText text={'Сохранить существующие заметки'} ComponentRight={SwitchBox} onPress={touchCard} />
      <HelperText type="error" visible={error.flag}>
        {error.text}
      </HelperText>
      <_Button onPress={ handlerButton } title={'Зарегистриваться'}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 5,
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    borderWidth:1,
    borderRadius:10,
    margin:5,
    padding:10,
    fontSize:16,
  },
});

export default RegPage;