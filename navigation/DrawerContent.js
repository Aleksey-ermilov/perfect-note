import React, { useContext, useState } from 'react';
import { ImageBackground, Text, View, Alert, TouchableOpacity, FlatList } from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, DrawerContent } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { format } from 'date-fns';

import { ModalContext, NoteContext } from '../context/context';

import { colors, sizeIconDrawer, dateLocale, sortArray } from '../theme';
import { trimString } from '../helpers';

import { _Modal } from '../src/comonents/Modal';
import { NewCategoryModal } from '../src/comonents/bodyModal/NewCategoryModal';
import { LoginModal } from '../src/comonents/bodyModal/LoginModal';

export const CustomDrawerContent = (props) => {
  const { categories, newCategory, removeCategory } = useContext(NoteContext);
  const { isVisibleModal, showModal, Component, hiddenModal } = useContext(ModalContext);

  const [focus, setFocus] = useState('MainPage1');

  const selectorModal = () => {
    if (Component === 'NewCategoryModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <NewCategoryModal getText={getText}  />
        </_Modal>
      );
    }
    if (Component === 'loginModal') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <LoginModal push={pushRegPage} />
        </_Modal>
      );
    }
  };
  const pushRegPage = () => {
    props.navigation.navigate('OptionsStack', { screen: 'RegPage' })
    setFocus('MainPage1')
  }

  const getText = category => {
    // console.log('added category', category);
    newCategory(category);
  };
  const handlerRemoveCategory = item => {
    Alert.alert(
      "Удаление Категории",
      "Если Вы удалите категорию, то всё записи будут добавлены корзину",
      [
        {
          text: "Отмеа",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Удалить", onPress: () => {
          if (focus === `MainPage${item.id}`){
            props.navigation.navigate('MainStack', {
              screen: 'MainPage', params: {
                category: '1',
              },
            });
          }
          removeCategory(item.id)
          }
        }
      ],
      { cancelable: false }
    );
  }


  return (
    <View style={{
      flex: 1,
      // flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
    <DrawerContentScrollView {...props}>

      {selectorModal()}

      <ImageBackground
        source={require('../assets/drawerImage/image1.png')}
        style={{
          width: '100%',
          height: 200,
          justifyContent: 'flex-end',
        }}
      >
        <Text style={{
          fontWeight: 'bold',
          fontSize: 16,
          padding: 5,
          marginBottom: 15,
          marginLeft: 10,
          color: colors.dateColorDrawer,
        }}>{format(new Date(), 'iiii, yyyy-MM-dd', { locale: dateLocale.ru })}</Text>
      </ImageBackground>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: 15,
        marginTop: 10,
      }}>
        <Icon
          name='playlist-check'
          color={'#fff'}
          size={sizeIconDrawer}
        />
        <Text style={{ color: colors.text, marginLeft: 30, fontSize: 16 }}>Категории</Text>
      </View>

      <Drawer.Section>

        {
          categories.map(item =>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: 15,
                alignItems: 'center',
                marginLeft: 10,
              }}
              key={item.id}
            >
              <View style={{ width: '90%' }}>
                <DrawerItem

                  label={trimString(item.category)}
                  onPress={() => {
                    setFocus(`MainPage${item.id}`);
                    props.navigation.navigate('MainStack', {
                      screen: 'MainPage', params: {
                        category: item.id,
                      },
                    });
                  }}
                  focused={focus === `MainPage${item.id}` ? true : false}
                  icon={({ color, size }) => (
                    <Icon
                      name='circle-medium'
                      color={color}
                      size={sizeIconDrawer}
                    />
                  )}
                  {...props}
                />
              </View>
              {
                item.id !== '1' &&
                <TouchableOpacity onPress={() => handlerRemoveCategory(item)}>
                  <View>
                    <Icon
                      name='close'
                      color={'#fff'}
                      size={sizeIconDrawer}
                    />
                  </View>
                </TouchableOpacity>
              }
            </View>,
          )
        }
        <DrawerItem
          label="Новая категория"
          onPress={() => {
            showModal('NewCategoryModal')
            // setIsModal(true);
          }}
          icon={({ color, size }) => (
            <Icon
              name="plus"
              color={color}
              size={sizeIconDrawer}
            />
          )}
          {...props}
        />
      </Drawer.Section>

      <Drawer.Section>
        <DrawerItem
          label="Корзина"
          onPress={() => {
            setFocus('TrashPage');
            props.navigation.navigate('TrashStack', { screen: 'TrashPage' });
          }}
          focused={focus === 'TrashPage' ? true : false}
          icon={({ color, size }) => (
            <Icon
              name="delete"
              color={color}
              size={sizeIconDrawer}
            />
          )}
          {...props}
        />
        <DrawerItem
          label='Настройки'
          onPress={() => {
            setFocus('OptionsStack');
            props.navigation.navigate('OptionsStack', { screen: 'OptionsPage' });
          }}
          focused={focus === 'OptionsStack' ? true : false}
          icon={({ color, size }) => (
            <Icon
              name="settings"
              color={color}
              size={30}
            />
          )}
          {...props}
        />

      </Drawer.Section>


      {/*<DrawerItemList {...props} />*/}
    </DrawerContentScrollView>

      <Drawer.Section>
        <DrawerItem
          label='Войти'
          onPress={() => {
            showModal('loginModal')
            // props.navigation.navigate('OptionsStack', { screen: 'OptionsPage' });
          }}
          icon={({ color, size }) => (
            <Icon
              name="login"
              color={color}
              size={30}
            />
          )}
          {...props}
        />
      <DrawerItem
        label='Выйти'
        onPress={() => {
          console.log('logout');
          // props.navigation.navigate('OptionsStack', { screen: 'OptionsPage' });
        }}
        icon={({ color, size }) => (
          <Icon
            name="logout"
            color={color}
            size={30}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        )}
        {...props}
      />

      </Drawer.Section>
    </View>
  );
};