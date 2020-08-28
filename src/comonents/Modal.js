import * as React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet,Button } from 'react-native';

export const _Modal = ({ visible, changeVisible, children }) => {

  return (
    <Modal
      visible={visible}
      onRequestClose={changeVisible}
      transparent={true}
    >
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={changeVisible}
        activeOpacity={1}
      >
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.modal}>
            {children}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>

  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    // width: 200,
    // height: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
});
