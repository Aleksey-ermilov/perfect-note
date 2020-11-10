import AsyncStorage from '@react-native-community/async-storage';

// return promise
// JSON.parse(user)

export const getAppColorStory = async() => await AsyncStorage.getItem('appColor');
export const setAppColorStory = async (color) => await AsyncStorage.setItem('appColor', JSON.stringify(color));

export const getFontFamilyStory = async () => await AsyncStorage.getItem('fontStyle');
export const setFontFamilyStory = async (fontStyle) => await AsyncStorage.setItem('fontStyle', JSON.stringify(fontStyle));

export const getFontSizeStory = async () => await AsyncStorage.getItem('fontSize');
export const setFontSizeStory = async (fontSize) => await AsyncStorage.setItem('fontSize', JSON.stringify(fontSize));

export const getSortNotesStory = async () => await AsyncStorage.getItem('sort');
export const setSortNotesStory = async (sort) => await AsyncStorage.setItem('sort', JSON.stringify(sort));

export const getStorage = async(keys) => {
  const entries = await AsyncStorage.multiGet(keys);
  return entries.reduce((obj, arr) => {
    obj[arr[0]] = arr[1];
    return obj;
  }, {});
};