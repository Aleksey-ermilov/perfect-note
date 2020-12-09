import React from 'react';
import { View } from 'react-native';
import { Checkbox, Text } from 'react-native-paper';

export const TextMenu = (text) => <Text style={{ fontSize: 16 }}>{text}</Text>;

export const CheckboxMenu = (text, checkStatus = false, changeIsShowContentNotes, appColor) =>
  <View style={{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 16 }}>{text}</Text>
    </View>
    <Checkbox
      status={checkStatus ? 'checked' : 'unchecked'}
      onPress={() => changeIsShowContentNotes()}
      color={appColor.appColor}
    />
  </View>;