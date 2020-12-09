import React, { useContext, useState } from 'react';
import { View, Button, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Card, TouchableRipple, Divider } from 'react-native-paper'

import { sizeIconDrawer, colors } from '../../theme';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { OptionsAppContext } from '../../context/context';

export const CardTitle = ({title, subtitle, icon, onPress}) => {
  const { appColor } = useContext(OptionsAppContext);

  return (
    <TouchableRipple
      onPress={() => onPress()}
    >
      <>
      <Card.Title
        title={title}
        subtitle={subtitle}
        left={(props) => <Icon name={icon} color={appColor.appColor} size={sizeIconDrawer} /> }
      />
      <Divider />
      </>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({

});
