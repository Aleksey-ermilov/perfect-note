import React, { useContext, useState } from 'react';
import { View, Button, Text, StyleSheet, FlatList, SafeAreaView,  } from 'react-native';
import { Switch } from 'react-native-paper';

const AboutPage = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.noNotes}>
        <Text>About Page</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    flex: 1,
  },
  noNotes: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AboutPage;