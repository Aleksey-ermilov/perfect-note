import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableNativeFeedback, View } from 'react-native';

import { colors } from '../../theme';
import { OptionsAppContext } from '../../context/context';

export const _Button = ({ title, onPress, styleContainer, styleText }) => {
  const { appColor } = useContext(OptionsAppContext);

  return (

    <TouchableNativeFeedback onPress={onPress} >
      <View style={{...styles.container, ...styleContainer, backgroundColor: appColor}}>
        <Text style={[styles.text, styleText]}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
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