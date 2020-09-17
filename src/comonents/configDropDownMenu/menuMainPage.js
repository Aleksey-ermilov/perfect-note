import { TextMenu, CheckboxMenu } from './ComponentsHelpers';

export const menuMainPade = (isShowContentNotes, changeIsShowContentNotes) => {

  return [
    { onPress: () => console.log('Сортировка'), children: TextMenu('Сортировка') },
    {
      children: CheckboxMenu('Показать содержимое', isShowContentNotes, changeIsShowContentNotes),
      onPress: () => {
        console.log('Показать содержимое');
        changeIsShowContentNotes();
      },
    },
    { onPress: () => console.log('Плитка'), children: TextMenu('Плитка') },
  ];
};
