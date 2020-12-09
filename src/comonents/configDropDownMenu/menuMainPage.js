import { TextMenu, CheckboxMenu } from './ComponentsHelpers';

export const menuMainPade = (showModal, isShowContentNotes, changeIsShowContentNotes, appColor) => {

  return [
    {
      children: TextMenu('Сортировка'),
      onPress: () => {
        // console.log('Сортировка');
        showModal('SortModal')
      },
    },
    {
      children: CheckboxMenu('Показать содержимое', isShowContentNotes, changeIsShowContentNotes, appColor.appColor),
      onPress: () => {
        // console.log('Показать содержимое');
        changeIsShowContentNotes();
      },
    },
    { children: TextMenu(' Найти...'),
      onPress: () => {
        console.log('find')
        showModal('FineModal')
      },
    },
  ];
};
