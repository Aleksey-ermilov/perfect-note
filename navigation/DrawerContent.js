import React, { useContext, useState } from 'react';
import { ImageBackground, Text, View, Alert, TouchableOpacity } from 'react-native';
import { Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

import { NoteContext } from '../context/context';

import { colors, sizeIconDrawer, dateLocale } from '../theme';
import { trimString } from '../helpers';

import { _Modal } from '../src/comonents/Modal';
import { NewCategoryModal } from '../src/comonents/bodyModal/NewCategoryModal';

// const dateLocale = {
//   ru: ru,
//   en: enUS,
// };

export const CustomDrawerContent = (props) => {
  const { categories, newCategory, removeCategory } = useContext(NoteContext);

  const [focus, setFocus] = useState('MainPageall');
  const [isModal, setIsModal] = useState(false);

  const getText = category => {
    // console.log('added category', category);
    newCategory(category);
  };
  const handlerRemoveCategory = item => {
    // removeCategory(item)
    Alert.alert(
      "Удаление Категории",
      "Если Вы удалите категорию, то всё записи так же будут удалены",
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
                category: 'all',
              },
            });
          }
          removeCategory(item)
          }
        }
      ],
      { cancelable: false }
    );
  }


  return (
    <DrawerContentScrollView {...props}>
      <_Modal visible={isModal} changeVisible={() => setIsModal(false)}>
        <NewCategoryModal
          getText={getText}
          hiddenModal={() => setIsModal(false)}
        />
      </_Modal>

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
                item.id !== 'all' &&
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
            setIsModal(true);
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
          label='О приложении'
          onPress={() => {
            setFocus('AboutStack');
            props.navigation.navigate('AboutStack', { screen: 'AboutPage' });
          }}
          focused={focus === 'AboutStack' ? true : false}
          icon={({ color, size }) => (
            <Icon
              name="information-outline"
              color={color}
              size={30}
            />
          )}
          {...props}
        />
      </Drawer.Section>


      {/*<DrawerItemList {...props} />*/}
    </DrawerContentScrollView>
  );
};