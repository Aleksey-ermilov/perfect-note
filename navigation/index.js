import React from 'react';
import { Text, ImageBackground } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { format } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'

import MainStack from './MainStack';
import AboutStack from './AboutStack';
import TrashStack from './TrashStack';
import { colors } from '../theme';

const Drawer = createDrawerNavigator();

const dateLocale = {
  ru: ru,
  en: enUS
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>

      <ImageBackground
        source={require('../assets/drawerImage/image1.png')}
        style={{
          width:'100%',
          height:200,
          justifyContent: 'flex-end'
        }}
      >
        <Text style={{
          fontWeight:'bold',
          fontSize:16,
          padding:5,
          marginBottom:15,
          marginLeft:10,
          color: colors.dateColorDrawer
        }}>{format(new Date(),'iiii, yyyy-MM-dd',{locale: dateLocale.ru})}</Text>
      </ImageBackground>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Navigation(){
    return (
        <NavigationContainer >
          <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
            initialRouteName="MainStack"
            drawerStyle={{
              backgroundColor: colors.mainColor,
              color: colors.text
            }}
            drawerContentOptions={{
              activeTintColor: colors.text,
              activeBackgroundColor: colors.backgroundDrawerInactiveItem,
              inactiveTintColor: colors.text,
            }}
          >
            <Drawer.Screen name="MainStack" component={MainStack} options={{title:'Заметки'}} />
            <Drawer.Screen name="TrashStack" component={TrashStack} options={{title:'Корзина'}}/>
            <Drawer.Screen name="AboutStack" component={AboutStack} options={{title:'О приложении'}}/>
          </Drawer.Navigator>
        </NavigationContainer>
      );
}