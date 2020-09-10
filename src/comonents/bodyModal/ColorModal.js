import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { ModalContext } from '../../../context/context';

import { ColorBox } from '../ColorBox';

import { noteColors } from '../../../theme';
import { _Button } from '../Button';

export const ColorModal = ({ getColor }) => {
  const { hiddenModal } = useContext(ModalContext);

  const selectedColor = (color) => {
    getColor(color)
  };

  const renderItem = ({ item }) => <ColorBox color={item.color} getColor={selectedColor} />

  return (
    <View style={styles.container}>
      <FlatList
        data={noteColors}
        renderItem={renderItem}
        keyExtractor={item => item.color}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
      />
      <_Button onPress={() => hiddenModal()} title={'Закрыть'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 330, // Высота flatList и всей модалки
    // backgroundColor: 'white',
  },
});