import React from 'react';
import { View } from 'react-native';
import { Avatar, TouchableRipple } from 'react-native-paper';

export const AvatarImage = ({ item, getIcon }) => {
  return (
    <View style={{
      marginBottom:10
    }}>
      <TouchableRipple
        activeOpacity={1}
        onPress={() => getIcon(item.id)}
      >
        <Avatar.Image size={65} source={item.icon}/>
      </TouchableRipple>
    </View>
  );
};