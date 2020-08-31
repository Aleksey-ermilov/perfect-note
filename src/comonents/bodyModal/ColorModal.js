import React, { useContext } from 'react';
import { View, Button, StyleSheet, FlatList } from 'react-native';

import { ModalContext } from '../../../context/context';

import { ColorBox } from '../ColorBox';

import { noteColors } from '../../../theme';

export const ColorModal = ({ getColor }) => {
  const { hiddenModal } = useContext(ModalContext);
  const selectedColor = (color) => {
    getColor(color)
  };

  const renderItem = ({ item }) => {
    return (
      <ColorBox
        color={item.color}
        getColor={selectedColor}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={noteColors}
        renderItem={renderItem}
        keyExtractor={item => item.color}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
      />
      <Button onPress={() => hiddenModal()} title={'Закрыть'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 400,
    // backgroundColor: 'white',
  },
});