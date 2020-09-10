import React from 'react';
import { Text, StyleSheet, TouchableNativeFeedback, View } from 'react-native';

import { colors } from '../../theme';

export const _Button = ({ title, onPress, styleContainer, styleText }) => {

  return (

    <TouchableNativeFeedback onPress={onPress} >
      <View style={[styles.container, styleContainer]}>
        <Text style={[styles.text, styleText]}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    backgroundColor: colors.mainColor,
    paddingVertical:10,
    paddingHorizontal:10,
    borderRadius:20,
    margin:15,
    marginBottom:0
  },
  text: {
    fontSize:16,
    color: colors.text
  },
});