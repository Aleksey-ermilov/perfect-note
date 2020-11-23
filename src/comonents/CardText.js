import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Card, TouchableRipple, Divider, List } from 'react-native-paper';

export const CardText = ({text, description, onPress, ComponentRight = () => <></>}) => {

  return (
    <TouchableRipple
      onPress={() => onPress()}
      style={{ marginBottom: 5 }}
    >
      <List.Item
        title={text}
        description={description}
        titleStyle={{fontSize:18}}
        right = {(props) => <ComponentRight {...props} style={styles.right} />}
      />
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  right:{
    marginHorizontal: 10,
    alignSelf:'center',
  }
});
