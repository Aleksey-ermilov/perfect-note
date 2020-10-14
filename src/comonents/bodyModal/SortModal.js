import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { _Button } from '../Button';

import { colors, sortArray } from '../../../theme';

import { ModalContext } from '../../../context/context';

export const SortModal = ({ getSort,sort }) => {
  const { hiddenModal } = useContext(ModalContext);

  const [value, setValue] = useState(sort);

  const selectedCategory = (sort) => {
    getSort(sort);
  };

  const renderItem = ({ item }) => <RadioButton.Item label={item.content} value={item.id}/>;

  return (
    <View style={styles.container}>
      {/* Высота flatList */}
      <View style={{ height: 150 }}>
        <RadioButton.Group
          onValueChange={value => {
            // setValue(value);
            selectedCategory(value);
          }}
          // value={value}
          value={sort}
        >
          <FlatList
            data={sortArray}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </RadioButton.Group>
      </View>

      <_Button onPress={() => hiddenModal()} title={'Закрыть'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  text: {
    borderColor: colors.mainColor,
    borderWidth:1,
    borderRadius:10,
    margin:5,
    padding:10,
    fontSize:16,
  }
});