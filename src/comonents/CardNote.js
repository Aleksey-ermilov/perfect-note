import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const CardNote = ({ note, onPress, onLongPress }) => {

  return (
    <Card
      style={{
        margin: 5,
        backgroundColor: note.itemBackground
      }}
      onPress={() => onPress(note) }
      onLongPress={() => onLongPress(note) }
    >
      <Card.Title title={note.title}/>
      <Card.Content>
        <Paragraph>{note.text}</Paragraph>
      </Card.Content>

      {/*<Card.Actions>*/}
      {/*  <Button>Cancel</Button>*/}
      {/*  <Button>Ok</Button>*/}
      {/*</Card.Actions>*/}
    </Card>
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