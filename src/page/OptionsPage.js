import React, {  } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { CardTitle } from '../comonents/CardTitle';

const OptionsPage = ({navigation}) => {

  const touchGeneral = () => navigation.push('GeneralPage');
  const touchSafety = () => navigation.push('SafetyPage');

  return (
    <SafeAreaView style={styles.container}>
      <CardTitle title={'Общие'} icon={'settings'} onPress={touchGeneral} />
      <CardTitle title={'Безопасность'} icon={'lock'} onPress={touchSafety} />


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical:5,
    flex: 1,
  },
  noNotes:{
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  }
});

export default OptionsPage;