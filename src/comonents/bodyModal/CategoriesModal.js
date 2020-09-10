import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { ModalContext, NoteContext } from '../../../context/context';

import { _Button } from '../Button';
import { trimString } from '../../../helpers';

export const CategoryModal = ({ getCategory, note }) => {
  const { hiddenModal } = useContext(ModalContext);
  const { categories } = useContext(NoteContext);

  const [value, setValue] = useState( () => {
    if (note){
      return note.category
    }
  });

  const selectedCategory = (category) => {
    getCategory(category);
  };

  const renderItem = ({ item }) => <RadioButton.Item label={trimString(item.category)} value={item.id}/>;

  return (
    <View style={styles.container}>
      {/* Высота flatList */}
      <View style={{ height: 210 }}>
        <RadioButton.Group
          onValueChange={value => {
            setValue(value);
            selectedCategory(value);
          }}
          value={value}
        >
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </RadioButton.Group>
      </View>

      <_Button onPress={() => hiddenModal()} title={'Закрыть'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
});