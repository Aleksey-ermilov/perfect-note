import { TextMenu } from './ComponentsHelpers';

export const menuNotePage = (showModal, removeNote, route, navigation, typeNote, changeTypeNote) => {

  return [
    { children: TextMenu('Список'),onPress: () => {
        console.log('Список')
        changeTypeNote(typeNote === 'list' ? 'text' : 'list')
      },
    },
    {
      children: TextMenu('Изменить цвет'), onPress: () => {
        console.log('Изменить цвет');
        showModal('ColorModal');
      },
    },
    {
      children: TextMenu('Выбрать категорию'), onPress: () => {
        console.log('Выбрать категорию');
        showModal('CategoryModal');
      },
    },
    { onPress: () => console.log('Напоминание'), children: TextMenu('Напоминание') },
    { onPress: () => console.log('Добавить изображение'), children: TextMenu('Добавить изображение') },
    {
      children: TextMenu('Удалить'), onPress: () => {
        const note = route.params.note;
        if (note.id) {
          navigation.goBack();
          removeNote(note);
        } else {
          navigation.goBack();
        }
      },
    },
  ];
};