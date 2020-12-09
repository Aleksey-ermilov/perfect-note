import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { CustomDrawerContent } from './DrawerContent';

import MainStack from './MainStack';
import TrashStack from './TrashStack';
import OptionsStack from './OptionsStack';
import LockedStack from './LockedStack';

import { colors } from '../theme';
import { OptionsAppContext } from '../context/context';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  const { appColor, isAuth } = useContext(OptionsAppContext);

  return (
    <NavigationContainer>
      { isAuth ?
        <Drawer.Navigator
          initialRouteName="MainStack"
          drawerStyle={{
            backgroundColor: appColor.appColor,
            color: appColor.text,
          }}
          drawerContentOptions={{
            activeTintColor: appColor.text,
            activeBackgroundColor: appColor.drawer,
            inactiveTintColor: appColor.text,
          }}
          drawerContent={props => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen initialParams={{ category: '1' }} name="MainStack" component={MainStack}/>
          <Drawer.Screen name="TrashStack" component={TrashStack}/>
          <Drawer.Screen name="OptionsStack" component={OptionsStack}/>
        </Drawer.Navigator>
        :
        <LockedStack />
      }
    </NavigationContainer>
  );
}