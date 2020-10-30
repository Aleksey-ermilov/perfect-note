import React, { useContext, useState } from 'react';
import { View, Button, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

const SafetyPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.noNotes}>
        <Text>Safety Page</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noNotes:{
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  }
});

export default SafetyPage;