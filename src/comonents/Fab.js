import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal, Provider } from 'react-native-paper';

import { colors } from '../../theme';
import { OptionsAppContext } from '../../context/context';

export const _Fab = ({ navigation, createNote }) => {
  const { appColor } = useContext(OptionsAppContext);

  const [open, setOpen] = useState(false);

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'window-close' : 'plus'}
          actions={[
            {
              accessibilityLabel: '111',
              icon: 'pencil',
              onPress: () => {
                // console.log('text note');
                // navigation.push('NotePage');
                createNote('text')
              },
              color: colors.text,
              style: { ...styles.itemFab, backgroundColor: appColor },
            },
            {
              icon: 'check-box-multiple-outline',
              onPress: () => {
                // console.log('Check list');
                createNote('list')
                // navigation.push('NotePage');
              },
              color: colors.text,
              style: { ...styles.itemFab, backgroundColor: appColor },
            },
          ]}
          color={colors.text}
          fabStyle={{ ...styles.fab, backgroundColor: appColor }}
          onStateChange={ ({ open }) => setOpen(open)}
        />
      </Portal>
    </Provider>
  );
};

const styles = StyleSheet.create({
  itemFab: {
    backgroundColor: colors.mainColor,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  fab: {
    backgroundColor: colors.mainColor,
    padding: 15,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
  },
});

export default _Fab;