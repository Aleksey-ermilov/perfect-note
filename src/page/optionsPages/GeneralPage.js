import React, { useContext, useState } from 'react';
import { View, Button, Text, StyleSheet, SafeAreaView } from 'react-native';
import {  } from 'react-native-paper';

import { appColors, fontFamilyNote, fontSizeNote } from '../../../theme';

import { CardText } from '../../comonents/CardText';

import { _Modal } from '../../comonents/Modal';
import { ColorModal } from '../../comonents/bodyModal/ColorModal';
import { RadioListModal } from '../../comonents/bodyModal/RadioListModal';

import { ModalContext, OptionsAppContext } from '../../../context/context';

const GeneralPage = ({ navigation }) => {

  const { isVisibleModal, Component, hiddenModal, showModal } = useContext(ModalContext);
  const { appColor, setColor, fontFamily, setFontFamily, fontSize, setFontSize } = useContext(OptionsAppContext);

  const selectorModal = () => {
    if (Component === 'AppColorModal') {
      return (
      <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
        <ColorModal getColor={getColor} listColors={appColors}/>
      </_Modal>
      )
    }
    if (Component === 'FontFamilyNote') {
      return (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <RadioListModal dataList={fontFamilyNote} getValue={getFontFamily} selected={fontFamily} />
        </_Modal>
      )
    }
    if (Component === 'FontSizeNote') {
      return  (
        <_Modal visible={isVisibleModal} changeVisible={() => hiddenModal()}>
          <RadioListModal dataList={fontSizeNote} getValue={getFontSize} selected={fontSize} />
        </_Modal>
      )
    }
  };

  const getColor = color => { setColor(color) };
  const getFontFamily = fontFamily => { setFontFamily(fontFamily) }
  const getFontSize = fontSize => { setFontSize(fontSize) }

  const touchColorCard = () => { showModal('AppColorModal') };
  const touchFontFamilyNote = () => { showModal('FontFamilyNote') };
  const touchFontSizeNote = () => { showModal('FontSizeNote') };

  const ColorBox = () => <View style={{...styles.colorBox, backgroundColor: appColor.appColor,}}></View>
  const TextFontFamily = props => <Text {...props} >{ fontFamily.text }</Text>
  const TextFontSize = props => <Text {...props} >{ fontSize.text }</Text>
  return (
    <SafeAreaView style={styles.container}>

      {selectorModal()}

      <CardText text={'Цвет итерфейса'} ComponentRight={ColorBox} onPress={touchColorCard} />
      <CardText text={'Стиль текста заметки'} ComponentRight={TextFontFamily} onPress={touchFontFamilyNote} />
      <CardText text={'Размер текста заметки'} ComponentRight={TextFontSize} onPress={touchFontSizeNote} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical:5,
    flex: 1,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noNotes: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GeneralPage;