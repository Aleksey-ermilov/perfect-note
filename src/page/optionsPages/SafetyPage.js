import React, { useContext, useState } from 'react';
import { View, Button, Text, StyleSheet, FlatList, SafeAreaView,  } from 'react-native';
import { Switch } from 'react-native-paper';

import { CardText } from '../../comonents/CardText';

import { ModalContext, OptionsAppContext } from '../../../context/context';

import { _Modal } from '../../comonents/Modal';
import { RadioListModal } from '../../comonents/bodyModal/RadioListModal';
import { PasswordAppModal } from '../../comonents/bodyModal/PassworAppModal';
import { PinPasswordAppModal } from '../../comonents/bodyModal/PinPasswordModal';

import {} from '../../../theme';

const appPassList = [
  { text: 'Отключить', id: '1', type: 'disabled' },
  { text: 'Пароль', id: '2', type: 'pass' },
  { text: 'PIN-код', id: '3', type: 'pin' },
];

const SafetyPage = ({ navigation }) => {
  const { isVisibleModal, Component, hiddenModal, showModal } = useContext(ModalContext);
  const { appColor, appPassword, setAppPassword } = useContext(OptionsAppContext);

  const [isSwitchOn, setIsSwitchOn] = useState(appPassword.type ==='disabled' ? false : true );
  const [appPass, setAppPass] = useState(appPassList.find(item => item.type === appPassword.type));

  const selectorModal = () => {
    if (Component === 'AppPasswordModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal() }>
          <RadioListModal dataList={appPassList} getValue={getAppPass} selected={appPass}/>
        </_Modal>
      );
    }
    if (Component === 'PasswordAppModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => {
          hiddenModal()
          setAppPass(appPassList[0])
          setIsSwitchOn(false)
        }}>
          <PasswordAppModal getPassword={getAppPassword}/>
        </_Modal>
      );
    }
    if (Component === 'PinPasswordAppModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => {
          hiddenModal()
          setAppPass(appPassList[0])
          setIsSwitchOn(false)
        }}>
          <PinPasswordAppModal getPinPassword={getAppPinPassword}/>
        </_Modal>
      );
    }
  };
  const getAppPass = appPass => {
    setAppPass(appPass);
    // setIsSwitchOn(appPass.id !== '1' ? true : false);
    if (appPass.id === '1'){
      setIsSwitchOn(false)
      console.log('app pass disabled', {type: 'disabled', password: ''} );
      setAppPassword( {type: 'disabled', password: ''} )
    }else{
      setIsSwitchOn(true)
    }
    if (appPass.id === '2') {
      // navigation.push('PassPage')
      hiddenModal();
      showModal('PasswordAppModal');
    }
    if (appPass.id === '3') {
      // navigation.push('PinPassPage');
      hiddenModal();
      showModal('PinPasswordAppModal');
    }
  };
  const getAppPassword = pass => {
    pass = {type: 'pass', password: pass}
    console.log('app pass',pass);
    setAppPassword( pass )
  }
  const getAppPinPassword = pin => {
    pin = {type: 'pin', password: pin}
    console.log('app pin',pin);
    setAppPassword( pin )
  }

  const onToggleSwitch = () => {
    setIsSwitchOn(prev => {
      if (!isSwitchOn) {
        setAppPass(appPassList[1]);
        // navigation.push('PassPage');
        showModal('PasswordAppModal');
      } else {
        console.log('app pass disabled', {type: 'disabled', password: ''} );
        setAppPassword( {type: 'disabled', password: ''} )
        setAppPass(appPassList[0]);
      }
      return !isSwitchOn;
    });
  };

  const SwitchBox = () => <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={appColor.appColor}/>;

  const touchPassCard = () => {

    showModal('AppPasswordModal');
  };

  return (
    <SafeAreaView style={styles.container}>

      {selectorModal()}

      <CardText text={'Защита паролем приложения'} ComponentRight={SwitchBox} onPress={touchPassCard}/>
      {/*<View style={styles.noNotes}>*/}
      {/*  <Text>Safety Page</Text>*/}
      {/*</View>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    flex: 1,
  },
  noNotes: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SafetyPage;