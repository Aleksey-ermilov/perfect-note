import React, {  } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { CardTitle } from '../comonents/CardTitle';

const OptionsPage = ({navigation}) => {

  const touchGeneral = () => navigation.push('GeneralPage');
  const touchSafety = () => navigation.push('SafetyPage');
  const touchUser = () => navigation.push('UserPage');
  const touchAbout = () => navigation.push('AboutPage');

  return (
    <SafeAreaView style={styles.container}>
      <CardTitle title={'Общие'} icon={'settings'} onPress={touchGeneral} />
      <CardTitle title={'Безопасность'} icon={'lock'} onPress={touchSafety} />
      <CardTitle title={'Пользователь'} icon={'account'} onPress={touchUser} />
      <CardTitle title={'О программе'} icon={'information'} onPress={touchAbout} />


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