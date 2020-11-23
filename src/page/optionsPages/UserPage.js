import React, { useContext, useState } from 'react';
import { View, Button, StyleSheet, FlatList, SafeAreaView,  } from 'react-native';
import { Avatar, Title, Caption, Text, Paragraph } from 'react-native-paper';

import { ModalContext, UserContext } from '../../../context/context';

import { format } from "date-fns";
import { dateLocale } from '../../../theme';

import { CardText } from '../../comonents/CardText';

import { _Modal } from '../../comonents/Modal';
import { PasswordAppModal } from '../../comonents/bodyModal/PassworAppModal';


const UserPage = ({ navigation }) => {
  const { isVisibleModal, showModal, Component, hiddenModal } = useContext(ModalContext);
  const { user } = useContext(UserContext)

  const selectorModal = () => {
    if (Component === 'PasswordUserModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <PasswordAppModal getPassword={getUserPassword}/>
        </_Modal>
      );
    }
  };
  const getUserPassword = pass => {
    console.log('app pass',pass);
  }

  const touchChangeLogin = () => {
    console.log('login change');
  }
  const touchChangeEmil = () => {
    console.log('email change');
  }
  const touchChangePassword = () => {
    console.log('password change');
    showModal('PasswordUserModal')
  }
  const touchSaveNote = () => {
    console.log('save note');
  }

  return (
    <SafeAreaView style={styles.container}>

      {selectorModal()}

      <View style={{ paddingLeft: 30}}>
        <View style={{flexDirection:'row', marginTop:15}}>
          <Avatar.Icon size={75} icon={'account-circle'} />
          <View style={{marginLeft:15}}>
            <Title>{user.login}</Title>
            <Caption>{user.email}</Caption>
          </View>
        </View>
        <View style={{marginTop:5}}>
          <Paragraph>{`Последнии изменения: ${format(new Date(user.dateLastChange), 'yyyy-MM-dd', { locale: dateLocale.ru })}`}</Paragraph>
        </View>
      </View>

      <View style={{marginVertical:15}}>
        <CardText text={'Изменить логин'} onPress={touchChangeLogin} />
        <CardText text={'Изменить email'} onPress={touchChangeEmil} />
        <CardText text={'Изменить пароль'} onPress={touchChangePassword} />
        <CardText text={'Сохранить заметки на сервере'} onPress={touchSaveNote} />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    flex: 1,
  },
});

export default UserPage;