import { TextMenu, CheckboxMenu } from './ComponentsHelpers';

export const menuTrashPade = (isShowContentNotes, changeIsShowContentNotes, removeAllTrash) => {

  return [

    {
      children: CheckboxMenu('Показать содержимое', isShowContentNotes, changeIsShowContentNotes),
      onPress: () => {
        // console.log('Показать содержимое');
        changeIsShowContentNotes();
      },
    },
    {
      children: TextMenu('Очистить корзину'),
      onPress: () => {
        // console.log('Сортировка');
        removeAllTrash()
      },
    },
  ];
};
