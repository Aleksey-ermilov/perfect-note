import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Text, TouchableRipple, Caption } from 'react-native-paper';

import { format } from 'date-fns';

import { dateLocale } from '../../theme';
import { OptionsAppContext } from '../../context/context';

const CardNote = ({ note, onPress, onLongPress }) => {
  const { isShowContentNotes } = useContext(OptionsAppContext);

  // let q = str.split('\n').slice(0,3).map(item => item.trim())
  let text = note.text.split('\n').slice(0,3)//.map(item => item.trim())

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
        { isShowContentNotes &&
          // <Paragraph>{note.text}</Paragraph>
          <Paragraph>{text}</Paragraph>
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


    // <Card
    //   style={{
    //     margin: 5,
    //     backgroundColor: note.itemBackground
    //   }}
    //   onPress={() => onPress(note) }
    //   onLongPress={() => onLongPress(note) }
    // >
    //   <Card.Title title={note.title}/>
    //   <Card.Content>
    //     <Paragraph>{note.text}</Paragraph>
    //   </Card.Content>
    //
    //   {/*<Card.Actions>*/}
    //   {/*  <Button>Cancel</Button>*/}
    //   {/*  <Button>Ok</Button>*/}
    //   {/*</Card.Actions>*/}
    // </Card>
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