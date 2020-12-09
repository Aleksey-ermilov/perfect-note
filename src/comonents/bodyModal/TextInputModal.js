import React, { useContext, useState,useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { ModalContext, OptionsAppContext } from '../../../context/context';

import { _Button } from '../Button';
import { HelperText } from 'react-native-paper';

export const TextInputModal = ({ firstValue = '', getValue, placeholder }) => {
  const { appColor } = useContext(OptionsAppContext);
  const { hiddenModal } = useContext(ModalContext);

  const [ value, setValue ] = useState(firstValue)

  const [ error, setError ] = useState({ flag: false, text: '' })

  useEffect(()=> {
    setError({flag: false, text: ''})
  },[value])

  const buttonHandler = () => {
    if (value.length === 0){
      setError({flag: true, text: 'Придумай хоть что-нибудь...'})
    }else {
      getValue(value)
      hiddenModal()
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={text => setValue(text)}
        style={{ ...styles.text, borderColor: appColor.appColor }}
        autoFocus={true}
        placeholder={placeholder}
      />
      <HelperText type="error" visible={error.flag}>
        {error.text}
      </HelperText>
      <_Button onPress={buttonHandler} title={'Закрыть'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    // height: 330, // Высота flatList и всей модалки
    // backgroundColor: 'white',
  },
  text: {
    borderWidth:1,
    borderRadius:10,
    margin:5,
    padding:10,
    fontSize:16,
  }
});