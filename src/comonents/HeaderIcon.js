import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

import { colors } from '../../theme';

export const HeaderIcon = props => (
  <HeaderButton
    iconSize={30}
    color={colors.text}
    IconComponent={Ionicons}
    {...props}
  />
)