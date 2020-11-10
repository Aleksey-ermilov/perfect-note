import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Title, Text, TouchableRipple, Caption, } from 'react-native-paper';

import { format } from 'date-fns';

import { dateLocale } from '../../theme';
import { NoteContext, OptionsAppContext } from '../../context/context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { trimString } from '../../helpers';

export default function CardNote ({ note, onPress, onLongPress }) {
  const { isShowContentNotes, fontFamily, fontSize } = useContext(OptionsAppContext);
  const { categories } = useContext(NoteContext);

  const findCategory = () => {
    if (categories.find( item => item.id === note.category)){
      return categories.find( item => item.id === note.category).category
    }else {
      return categories.find( item => item.id === '1' ).category
    }
  }

  const renderItem = ({ item }) => {
    // check-box-outline        полный
    // checkbox-blank-outline   пустой
    return (
      <View
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
        <Text style={{paddingHorizontal:5, fontFamily: fontFamily.id, fontSize: +fontSize.id }}>{item.content}</Text>
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
        <Title style={{ fontFamily: fontFamily.id, fontSize: (+fontSize.id + 6) }}>{note.title}</Title>
        {isShowContentNotes &&

        <>
          {
            note.type === 'text' ?
              <Text style={{ fontFamily: fontFamily.id, fontSize: +fontSize.id }}>{text}</Text>
              :
              <FlatList
                data={note.text}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
          }
        </>
        }
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
          <Caption>{`Категория: ${ trimString(findCategory()) }`}</Caption>
          <Caption>{`Дата: ${format(new Date(note.date), 'yyyy-MM-dd', { locale: dateLocale.ru })}`}</Caption>
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

// export default CardNote;