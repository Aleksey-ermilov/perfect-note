import React, {  } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import { CustomDrawerContent } from './DrawerContent';

import MainStack from './MainStack';
import AboutStack from './AboutStack';
import TrashStack from './TrashStack';

import { colors } from '../theme';

const Drawer = createDrawerNavigator();

export default function Navigation(){
    return (
        <NavigationContainer >
          <Drawer.Navigator
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
            drawerContent={props => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen initialParams={{ category: 'all' } } name="MainStack" component={MainStack}  />
            <Drawer.Screen name="TrashStack" component={TrashStack} />
            <Drawer.Screen name="AboutStack" component={AboutStack} />
          </Drawer.Navigator>
        </NavigationContainer>
      );
}