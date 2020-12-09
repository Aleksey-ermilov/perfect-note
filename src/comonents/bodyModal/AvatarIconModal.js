import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList,ScrollView } from 'react-native';
import { RadioButton, Avatar } from 'react-native-paper';

import { ModalContext, OptionsAppContext } from '../../../context/context';

import { _Button } from '../Button';
import { AvatarImage } from '../AvatarImage';

import { avatarIcons } from '../../../theme';


export const AvatarIconModal = ({ getAvatar }) => {
  const { hiddenModal } = useContext(ModalContext);
  const { appColor } = useContext(OptionsAppContext);

  const getIcon = icon => {
    getAvatar(icon);
  }

  const renderItem = ({ item }) => <AvatarImage getIcon={getIcon} item={item} />;

  return (
    <View style={styles.container}>
      {/* Высота flatList */}
      <View style={{ height: 210 }} >
        <FlatList
          data={avatarIcons}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={4}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
        />
      </View>

      <_Button onPress={() => hiddenModal()} title={'Закрыть'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
});