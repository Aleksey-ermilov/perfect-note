import { enUS, ru } from 'date-fns/locale';

export const sizeIconDrawer = 30

export const firebaseConfig = {
  apiKey: "AIzaSyAWdV7l338-3odaDJ_0RirbS_XIB50GXao",
  authDomain: "perfect-note.firebaseapp.com",
  databaseURL: "https://perfect-note.firebaseio.com",
  projectId: "perfect-note",
  storageBucket: "perfect-note.appspot.com",
  messagingSenderId: "1068445423582",
  appId: "1:1068445423582:web:83ca4e0c2655acbb1b6f4f"
};

export const dateLocale = {
  ru: ru,
  en: enUS,
};

export const sortArray = [
  {text: 'АБВ', id: 'ABC'},
  {text: 'ЯЮЭ', id: 'ZYX'},
  {text: 'По дате', id: 'date'},
]

export const appPassList = [
  { text: 'Отключить', id: '1', type: 'disabled' },
  { text: 'Пароль', id: '2', type: 'pass' },
  { text: 'PIN-код', id: '3', type: 'pin' },
];

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
  { appColor: '#41B619' },
  { appColor: '#BCBEC0' },
  { appColor: '#1771F1' },
  { appColor: '#fff' },
  { appColor: '#ef476f' },
  { appColor: '#ffd166' },
  { appColor: '#06d6a0' },
  { appColor: '#118ab2' },
  { appColor: '#FD0079' },
  { appColor: '#e71d36' },
  { appColor: '#51EAFF' },
  { appColor: '#bc00dd' },
]

export const appColors = [
  { appColor: '#41B619',text: '#fff',drawer: '#5BFF62' },// text: '#fff',drawer: '#5BFF62'
  { appColor: '#58595B',text: '#fff',drawer: '#939598' },// text: '#fff',drawer: '#939598'
  { appColor: '#2300B0',text: '#fff',drawer: '#0260E8' },// text: '#fff',drawer: '#0260E8'
  { appColor: '#FF756B',text: '#fff',drawer: '#FE9E76' },// text: '#000',drawer: '#A771FE'
  { appColor: '#a100f2',text: '#fff', drawer: '#bc00dd' },// text: '#fff', drawer: '#bc00dd'
  { appColor: '#FFC11E',text: '#fff',drawer: '#F5E027' },// text: '#fff',drawer: '#FBFF00'
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

export const avatarIcons = [
  { icon: require('../assets/avatar/avatar1.png'), id: '1' },
  { icon: require('../assets/avatar/avatar2.png'), id: '2' },
  { icon: require('../assets/avatar/avatar3.png'), id: '3' },
  { icon: require('../assets/avatar/avatar4.png'), id: '4' },
  { icon: require('../assets/avatar/avatar5.png'), id: '5' },
  { icon: require('../assets/avatar/avatar6.png'), id: '6' },
  { icon: require('../assets/avatar/avatar7.png'), id: '7' },
  { icon: require('../assets/avatar/avatar8.png'), id: '8' },
  { icon: require('../assets/avatar/avatar9.png'), id: '9' },
  { icon: require('../assets/avatar/avatar10.png'), id: '10' },
  { icon: require('../assets/avatar/avatar11.png'), id: '11' },
  { icon: require('../assets/avatar/avatar12.png'), id: '12' },
  { icon: require('../assets/avatar/avatar13.png'), id: '13' },
  { icon: require('../assets/avatar/avatar14.png'), id: '14' },
  { icon: require('../assets/avatar/avatar15.png'), id: '15' },
  { icon: require('../assets/avatar/avatar16.png'), id: '16' },
]
