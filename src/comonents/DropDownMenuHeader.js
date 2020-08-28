import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { HeaderButtons, Item } from 'react-navigation-header-buttons/index';
import { Text } from 'react-native';
import { HeaderIcon } from './HeaderIcon';
import React from 'react';

export const DropDownMenuHeader = ({ ComponentTrigger, componentTriggerProps, menuOptions, note }) => {
  return (

      <Menu>
        <MenuTrigger customStyles={{
          TriggerTouchableComponent: ComponentTrigger,
          triggerTouchable: componentTriggerProps,
        }} />
        {/*<MenuTrigger customStyles={{*/}
        {/*  TriggerTouchableComponent: Item,*/}
        {/*  triggerTouchable: { title:'menu', iconName:'md-more' },*/}
        {/*}} />*/}
        <MenuOptions customStyles={optionsStyles}>
          {
            menuOptions.map( (option, index) => {
              return <MenuOption onSelect={() => option.onPress(note)} text={option.text} key={index.toString()}/>
            })
          }
          {/*<MenuOption onSelect={() => console.log('Список')} text='Список' />*/}
          {/*<MenuOption onSelect={() => console.log('Изменить цвет')} text='Изменить цвет' />*/}
          {/*<MenuOption onSelect={() => console.log('Напоминание')} text='Напоминание' />*/}
          {/*<MenuOption onSelect={() => console.log('Добавить изображение')} text='Добавить изображение' />*/}
          {/*<MenuOption onSelect={() => console.log('Удалить')} text='Удалить' />*/}
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
