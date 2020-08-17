import React from "react";
import {View, Button, Text, StyleSheet} from "react-native";
import { DrawerActions } from '@react-navigation/native';

const TrashPage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Trash Page</Text>

      <Button
        title="Toggle drawer"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TrashPage;