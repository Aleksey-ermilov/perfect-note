import { maxStringLength } from '../theme';

export const trimString = text => {
  if (text.length > maxStringLength){
    return `${text.substring(0,maxStringLength)}...`
  }

  return text
}

export const compareNotes = ( notes, type = 'ABC' ) => {

  switch (type) {
    case 'ABC':
      console.log('helper sort ABC');
      return notes.sort(function compare( a, b ) {
        if ( a.title < b.title ){
          return -1;
        }
        if ( a.title > b.title ){
          return 1;
        }
        return 0;
      })
      break;
    case 'ZYX':
      console.log('helper sort ZYX');
      return notes.sort(function compare( a, b ) {
        if ( a.title > b.title ){
          return -1;
        }
        if ( a.title < b.title ){
          return 1;
        }
        return 0;
      })
      break;
    case 'date':
      console.log('helper sort date');
      return notes.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
      break;
    default:
      return notes;
  }

}