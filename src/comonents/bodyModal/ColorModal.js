import React, { useState, useEffect, useContext } from 'react';
import { View, Button, StyleSheet, TextInput, Keyboard, TouchableOpacity, Text } from 'react-native';
import { NoteContext, ModalContext } from '../../../context/context';

export const ColorModal = ({ note }) => {
  const { updateNote } = useContext(NoteContext);
  const { hiddenModal } = useContext(ModalContext);

  console.log('color modal', note);
  return (
    <View style={styles.container}>
      <Text>color modal</Text>
      <Button onPress={() => hiddenModal()} title={'hidden modal'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: 350,
    height: 400,
    // backgroundColor: 'white',
  }
})