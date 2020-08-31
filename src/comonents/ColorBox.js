import { TouchableOpacity, View } from 'react-native';
import React from 'react';

export const ColorBox = ({ color, getColor }) => {
  const size = 70;
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => getColor(color)}
    >
      <View style={{
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: 50,
        margin: 10,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      </View>
    </TouchableOpacity>
  );
};