import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { RadioButton } from 'react-native-paper';

import { ModalContext, OptionsAppContext } from '../../../context/context';

import { _Button } from '../Button';
import { trimString } from '../../../helpers';

export const RadioListModal = ({ getValue, dataList, selected }) => {
  const { hiddenModal } = useContext(ModalContext);
  const { appColor } = useContext(OptionsAppContext);

  const [value, setValue] = useState(selected.id);

  const selectedItem = (value) => {
    getValue(dataList.find( item => item.id === value));
  };

  const renderItem = ({ item }) => <RadioButton.Item label={trimString(item.text)} value={item.id} color={appColor}/>;

  return (
    <View style={styles.container}>
      {/* Высота flatList */}
      <View style={{ height: 210 }}>
        <RadioButton.Group
          onValueChange={value => {
            setValue(value);
            selectedItem(value);
          }}
          value={value}
        >
          <FlatList
            data={dataList}
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