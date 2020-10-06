import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Title, Text, TouchableRipple, Caption, } from 'react-native-paper';

import { format } from 'date-fns';

import { dateLocale } from '../../theme';
import { OptionsAppContext } from '../../context/context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CardNote = ({ note, onPress, onLongPress }) => {
  const { isShowContentNotes } = useContext(OptionsAppContext);
  console.log(note.type,'1111');
  const renderItem = ({ item }) => {
    // check-box-outline        полный
    // checkbox-blank-outline   пустой
    return (
      <View key={item.id}
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 5,
              alignItems: 'center',
            }}
      >
        <Icon
          name={item.completed ? 'check-box-outline' : 'checkbox-blank-outline'}
          color={'#000'}
          size={24}
        />
        <Text style={{paddingHorizontal:5}}>{item.content}</Text>
      </View>
    );
  };

  let text = note.text.map(item => item.content).join('\n');

  return (
    <TouchableRipple
      onPress={() => onPress(note)}
      onLongPress={() => onLongPress(note)}
      style={{
        margin: 5,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 5,
        borderRadius: 5,
        backgroundColor: note.itemBackground,
      }}
    >
      <View>
        <Title>{note.title}</Title>
        {isShowContentNotes &&

        <>
          {
            note.type === 'text' ?
              <Text>{text}</Text>
              :
              <FlatList
                data={note.text}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
          }
        </>
        }
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
          <Caption>{`Категория: ${note.category}`}</Caption>
          <Caption>{`Дата: ${format(note.date, 'yyyy-MM-dd', { locale: dateLocale.ru })}`}</Caption>
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CardNote;