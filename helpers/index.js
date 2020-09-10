import { maxStringLength } from '../theme';

export const trimString = text => {
  if (text.length > maxStringLength){
    return `${text.substring(0,maxStringLength)}...`
  }

  return text
}