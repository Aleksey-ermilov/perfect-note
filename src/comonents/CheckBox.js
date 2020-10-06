import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Divider, Checkbox, Text } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { sizeIconDrawer, colors } from '../../theme';

export const CheckBox = ({ note, onChangeText, onChecked, removeCheckBox, addCheckBox }) => {

  const notCompleted = note.text.filter(item => item.completed === false)
  const yesCompleted = note.text.filter(item => item.completed === true)

  const renderItem = ({ item }) => {
    return (
      <View key={item.id}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
              alignItems: 'center',
            }}
      >
        <Checkbox
          status={item.completed ? 'checked' : 'unchecked'}
          onPress={() => onChecked( item.id )}
        />
        <View style={{ flex: 1 }}>
          <TextInput
            value={item.content}
            onChangeText={text => onChangeText(text, item.id)}
            placeholder={'Заметка...'}
            multiline={true}
            style={{
              ...styles.textInput,
              backgroundColor: note.itemBackground,
              textDecorationLine: item.completed ? 'line-through' : 'none'
            }}
          />
        </View>
        <TouchableOpacity onPress={() => {
          removeCheckBox(item.id)
        } }>
          <View style={{marginHorizontal:5, marginBottom:10}}>
            <Icon
              name='close'
              color={'#000'}
              size={sizeIconDrawer}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      <FlatList
        data={notCompleted}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      { yesCompleted.length >= 1 && <Divider style={{ marginHorizontal: 10, backgroundColor: colors.mainColor }}/>}

      <FlatList
        data={yesCompleted}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity onPress={() => {
        addCheckBox()
      } }>
        <View style={{
          flexDirection: 'row',
          marginHorizontal:10,
          alignItems: 'center',
        }}>
          <Icon
            name="plus"
            color={'#000'}
            size={sizeIconDrawer}
          />
          <Text>Новый пункт</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    padding: 5,
  },
});
