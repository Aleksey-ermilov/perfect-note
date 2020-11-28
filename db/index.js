import * as SQLite from 'expo-sqlite';
import { Notes } from './notes';
import { Categories } from './categories';

export const db = SQLite.openDatabase('perfect-note.db');

export class DB {
  static init() {
    return new Promise( (resolve, reject) => {
      db.transaction( tx => {
        tx.executeSql("PRAGMA foreign_keys=on");
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS categories (' +
          'id INTEGER PRIMARY KEY NOT NULL,' +
          'category TEXT NOT NULL ' +
          ')',
          [],
          () => {},
          ( _, error ) => reject(error)
        )
        tx.executeSql(
          `INSERT OR IGNORE INTO categories (category,id) VALUES (?,?) `,
          ['Все',1],
          () => {},
          ( _, error ) => reject(error)
        )
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS notes (' +
          'id INTEGER PRIMARY KEY NOT NULL,' +
          'title TEXT NOT NULL, ' +
          'text TEXT, ' +
          'itemBackground TEXT NOT NULL, ' +
          'category INTEGER NOT NULL, ' +
          'date TEXT NOT NULL,' +
          'type TEXT NOT NULL, ' +
          'password TEXT,' +
          'isTrash INT NOT NULL,' +
          'FOREIGN KEY(category) REFERENCES categories(id))',
          [],
          resolve,
          ( _, error ) => reject(error)
        )
      })
    })
  }

  static getNotes () {
    return Notes.getNotes()
  }
  static createNote (note) {
    return Notes.createNote(note)
  }
  static updateNote (note) {
    return Notes.updateNote(note)
  }
  static removeNote (id) {
    return Notes.removeNote(id)
  }
  static removeAllNotesTrash () {
    return Notes.removeAllNotesTrash()
  }
  static dropNotesTable() {
    return Notes.dropNotesTable()
  }
  static removeAllNotes () {
    return Notes.removeAllNotes()
  }


  static getCategories () {
    return Categories.getCategories()
  }
  static createCategory (category) {
    return Categories.createCategory(category)
  }
  static dropCategoriesTable () {
    return Categories.dropCategoriesTable()
  }
  static removeCategory (id) {
    return new Promise( (resolve,reject) => {
      Notes.updateCategoryAllNotesWithCategory(id).then( () => {
        Categories.removeCategory(id).then(resolve)
      })
    })
  }
  static removeAllCategories () {
    return Categories.removeAllCategories()
  }


  static setUserData (notes,categories,) {
    return new Promise( (resolve,reject) => {
      Categories.setCategories(categories).catch( e => console.log('setUserData categories error', e) )
      Notes.setNotes(notes).catch( e => console.log('setUserData notes error', e) )
    })
  }
}





















// title, text, itemBackground, category, date, type, password

// {
//   title: 'React native',
//     text: [
//   { content: `что-то... `, completed: false, id: '1' },
//   {
//     content: `fffffkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk`,
//     completed: false,
//     id: '2'
//   },
//   { content: `ffff`, completed: false, id: '3' },
// ],
//   id: '2',
//   itemBackground: 'lightblue',
//   category: 'all',
//   date: new Date('04 Dec 1995 00:12:00 GMT').toString(),
//   type: 'text',
//   password:'',
// },