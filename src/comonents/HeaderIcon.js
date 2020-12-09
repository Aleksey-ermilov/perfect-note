import React, { useContext } from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

import { colors } from '../../theme';
import { OptionsAppContext } from '../../context/context';

export const HeaderIcon = props => {
  const { appColor } = useContext(OptionsAppContext);
  return (
    <HeaderButton
      iconSize={30}
      color={appColor.text}
      IconComponent={Ionicons}
      {...props}
    />
  )
}