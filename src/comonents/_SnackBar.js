import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar, Portal } from 'react-native-paper';

import { colors } from '../../theme';

export default function _SnackBar({ setSnackbar, snackbar }) {

  const onDismissSnackBar = () =>  setSnackbar( prev => ({...prev, isVisible: false }) );

  return (
    <Portal>
      <View style={styles.container}>
        <Snackbar
          duration={snackbar.time || 2000}
          visible={snackbar.isVisible || false}
          onDismiss={onDismissSnackBar}
          style={{backgroundColor: snackbar.color || colors.success }}
        >
          {snackbar.text || 'Empty'}
        </Snackbar>
      </View>
    </Portal>

  );
}
const styles = StyleSheet.create({
  container: {
    padding:5,
    height:110
  },
});
