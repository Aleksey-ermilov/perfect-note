import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Avatar, Title, Caption, Text, Paragraph, Divider } from 'react-native-paper';

import { ModalContext, NoteContext, OptionsAppContext, UserContext } from '../../../context/context';

import { format } from 'date-fns';
import { colors, dateLocale } from '../../../theme';

import { CardText } from '../../comonents/CardText';

import { _Modal } from '../../comonents/Modal';
import { PasswordAppModal } from '../../comonents/bodyModal/PassworAppModal';
import { TextInputModal } from '../../comonents/bodyModal/TextInputModal';
import _SnackBar from '../../comonents/_SnackBar';
import { _Button } from '../../comonents/Button';
import { LoginModal } from '../../comonents/bodyModal/LoginModal';

const UserPage = ({ navigation }) => {
  const { isVisibleModal, showModal, Component, hiddenModal } = useContext(ModalContext);
  const { notes, categories, loadCategories, loadNotes, } = useContext(NoteContext);
  const { appColor } = useContext(OptionsAppContext);
  const { user, update, loadUserNotes, changePassword, removeUser } = useContext(UserContext);

  const [snackbar, setSnackbar] = useState({});

  const selectorModal = () => {
    if (Component === 'PasswordUserModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <PasswordAppModal getPassword={getUserPassword}/>
        </_Modal>
      );
    }
    if (Component === 'LoginUserModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <TextInputModal firstValue={user.login} getValue={getUserLogin} placeholder={'Логин...'}/>
        </_Modal>
      );
    }
    if (Component === 'loginModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <LoginModal push={() => props.navigation.navigate('OptionsStack', { screen: 'RegPage' }) }/>
        </_Modal>
      );
    }
  };
  const getUserPassword = async pass => {
    console.log('app pass', pass);
    await changePassword(pass)
    setSnackbar({ text: 'Пароль изменён успешно', isVisible: true });
  };
  const getUserLogin = async login => {
    await update({
      ...user,
      login
    })
    setSnackbar({ text: 'Логин изменён успешно', isVisible: true });
  }

  const touchChangeLogin = () => {
    console.log('login change');
    showModal('LoginUserModal')
  };
  const touchRemoveUser = async () => {
    Alert.alert(
      'Удаление Пользователя',
      'Если Вы удалите пользователя, то всё заметки и созданные категории будут потеряны!',
      [
        {
          text: 'Отмеа',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Удалить', onPress: async () => {
            try {
              await removeUser()
              setSnackbar({ text: 'Пользователь удалён успешно', isVisible: true });
            } catch (e){
              setSnackbar({ text: 'Неполучилось удалить пользователя\nПопробуйте пере зайти в учётную запись', isVisible: true, color: colors.error });
            }
          },
        },
      ],
      { cancelable: false },
    );
  };
  const touchChangePassword = () => {
    console.log('password change');
    showModal('PasswordUserModal')
  };
  const touchSaveNotes = async () => {
    console.log('save notes');
    await update({
      ...user,
      categories,
      notes,
      dateLastChange: new Date().getTime().toString()
    })
    setSnackbar({ text: 'Заметки сохранены успешно', isVisible: true });
  };
  const touchLoadNotes = async () => {
    Alert.alert(
      'Загрузка заметок',
      'Если Вы продолжете, то все имеющиеся заметки будут заменины на загруженные',
      [
        {
          text: 'Отмеа',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Продолжить', onPress: async () => {
            try {
              console.log('load notes');
              await loadUserNotes(user.id)
              await loadCategories()
              await loadNotes()
              setSnackbar({ text: 'Заметки загруженны успешно', isVisible: true });
            } catch (e){
              console.log('touchLoadNotes error',e);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  const touchBtnLogin = () => {
    showModal('loginModal');
  }

  return (
    <SafeAreaView style={styles.container}>

      {selectorModal()}

      <_SnackBar
        setSnackbar={setSnackbar}
        snackbar={snackbar}
      />

      {
        user ?
          <>
            <View style={{ paddingLeft: 30 }}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Icon size={75} icon={'account-circle'}/>
                <View style={{ marginLeft: 15 }}>
                  <Title>{user.login}</Title>
                  <Caption>{user.email}</Caption>
                </View>
              </View>
              <View style={{ marginTop: 5 }}>
                {
                  user.dateLastChange.length === 0 ?
                    <Paragraph>Заметки не сохранены</Paragraph>
                    :
                    <Paragraph>{`Последнии сохраннеи заметок: ${format(new Date(+user.dateLastChange), 'yyyy-MM-dd', { locale: dateLocale.ru })}`}</Paragraph>
                }

              </View>

            </View>
            <Divider style={{ backgroundColor: appColor }}/>
            <View style={{ marginVertical: 5 }}>
              <CardText text={'Изменить логин'} onPress={touchChangeLogin}/>
              <CardText text={'Изменить пароль'} onPress={touchChangePassword}/>
              <CardText text={'Загрузить заметки с сервера'} onPress={touchLoadNotes}/>
              <CardText text={'Сохранить заметки на сервере'} onPress={touchSaveNotes}/>
              <CardText text={'Удалить учётную запись'} onPress={touchRemoveUser}/>
            </View>
          </>
          :
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <_Button title={'Войти'} onPress={touchBtnLogin} />
          </View>
      }


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