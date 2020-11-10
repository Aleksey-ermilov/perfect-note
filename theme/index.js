import { enUS, ru } from 'date-fns/locale';

export const sizeIconDrawer = 30

export const dateLocale = {
  ru: ru,
  en: enUS,
};

export const sortArray = [
  {text: 'АБВ', id: 'ABC'},
  {text: 'ЯЮЭ', id: 'ZYX'},
  {text: 'По дате', id: 'date'},
]

export const colors = {
  mainColor: '#a100f2',
  dateColorDrawer: '#fff',
  text: '#fff',
  backgroundDrawerInactiveItem:'#bc00dd',
  success: '#39b715',
  warning: '#ffb700',
  error: '#bf0603',
}

export const noteColors = [
  { color: 'lightgreen' },
  { color: 'lightgray' },
  { color: 'lightblue' },
  { color: 'white' },
  { color: '#ef476f' },
  { color: '#ffd166' },
  { color: '#06d6a0' },
  { color: '#118ab2' },
  { color: '#073b4c' },
  { color: '#e71d36' },
  { color: '#3a0ca3' },
  { color: '#bc00dd' },
]

export const appColors = [
  { color: 'green' },
  { color: 'gray' },
  { color: 'blue' },
  { color: 'white' },
  { color: '#a100f2' },
  { color: '#ffd166' },
  // { color: '#06d6a0' },
  // { color: '#118ab2' },
  // { color: '#073b4c' },
  // { color: '#e71d36' },
  // { color: '#3a0ca3' },
  // { color: '#bc00dd' },
]

export const fontFamilyNote = [
  { text: 'Times New Roman', id: 'serif'},
  { text: 'Arial', id: 'normal'},
  { text: 'Courier', id: 'monospace'},
]

export const fontSizeNote = [
  { text:'10', id:'10' },
  { text:'12', id:'12' },
  { text:'14', id:'14' },
  { text:'16', id:'16' },
]
