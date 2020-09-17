import React from 'react';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Title, Checkbox } from 'react-native-paper';

export const DropDownMenuHeader = ({ ComponentTrigger, componentTriggerProps, menuOptions }) => {
  return (

      <Menu>
        <MenuTrigger customStyles={{
          TriggerTouchableComponent: ComponentTrigger,
          triggerTouchable: componentTriggerProps,
        }} />
        <MenuOptions customStyles={optionsStyles}>
          {
            menuOptions.map( (option, index) => {
              return <MenuOption onSelect={() => option.onPress()}  key={(index + 1).toString()}>{ option.children }</MenuOption>
            })
          }
        </MenuOptions>
      </Menu>

  )
}

const optionsStyles = {
  optionsContainer: {
    // padding:10
  },
  optionsWrapper: {},
  optionWrapper: {
    margin: 5,
  },
  optionTouchable: {},
  optionText: {
    fontSize:16

  },
};
