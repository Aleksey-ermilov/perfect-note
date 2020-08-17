import * as React from 'react';
import { View } from 'react-native';
import { BottomNavigation, Text, Portal, Provider } from 'react-native-paper';

const ColorBottomNavigation = () => {


  return (
    <Provider>
      <Portal.Host>
        <View style={{
          backgroundColor:'lightgreen'
        }}>
          <Text>qwe</Text>
        </View>
      </Portal.Host>
    </Provider>
  );
};

export default ColorBottomNavigation;