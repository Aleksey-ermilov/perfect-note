import { db } from './index';

export class Notes {
  static getNotes () {
    return new Promise( (resolve, reject) => {
      db.transaction( tx => {
        tx.executeSql(
          'SELECT * FROM notes',
          [],
          ( _, result ) => resolve(
            result.rows._array.map( item =>
              ({...item,text: JSON.parse(item.text), category: item.category.toString(), isTrash: !!item.isTrash })
            )
          ),
          ( _, error ) => reject(error)
        )
      })
    })
  }

  static createNote ({title, text, itemBackground, category, date, type, password,isTrash}) {
    const textStringify = JSON.stringify(text)
    const changedIsTrash = isTrash ? 1 : 0

    // console.log('createNote', title, text, itemBackground, category, date, type, password,isTrash);

    return new Promise( (resolve,reject) => {
      db.transaction( tx => {
        tx.executeSql(
          `INSERT INTO notes (title, text, itemBackground, category, date, type, password,isTrash) VALUES (?,?,?,?,?,?,?,?)`,
          [title, textStringify, itemBackground, category, date, type, password,changedIsTrash],
          ( _, result ) => resolve( result.insertId ),
          ( _, error ) => reject(error)
        )
      })
    })
  }

  static updateNote ({title, text, itemBackground, category, date, type, password,isTrash, id}) {
    const textStringify = JSON.stringify(text)
    const changedIsTrash = isTrash ? 1 : 0
    return new Promise( (resolve,reject) => {
      db.transaction( tx => {
        tx.executeSql(
          'UPDATE notes SET title = ?, text = ?, itemBackground = ?, category = ?, date = ?, type = ?, password = ?, isTrash = ? WHERE id = ?',
          [title, textStringify, itemBackground, category, date, type, password,changedIsTrash, id],
          resolve,
          ( _, error ) => reject(error)
        )
      })
    })
  }

  static removeNote (id) {
    return new Promise( (resolve,reject) => {
      db.transaction( tx => {
        tx.executeSql(
          'DELETE FROM notes WHERE id = ?',
          [id],
          resolve,
          ( _, error ) => reject(error)
        )
      })
    })
  }

  static removeAllNotesTrash () {
    return new Promise( (resolve,reject) => {
      db.transaction( tx => {
        tx.executeSql(
          'DELETE FROM notes WHERE isTrash = 1',
          [],
          resolve,
          ( _, error ) => reject(error)
        )
      })
    })
  }

  static removeAllNotes () {
    return new Promise( (resolve,reject) => {
      db.transaction( tx => {
        tx.executeSql(
          'DELETE FROM notes',
          [],
          resolve,
          ( _, error ) => reject(error)
        )
      })
    })
  }

  static updateCategoryAllNotesWithCategory (id) {
    return new Promise( (resolve,reject) => {
      db.transaction( tx => {
        tx.executeSql(
          'UPDATE notes SET category = ?, isTrash = ?  WHERE category = ?',
          [1, true, id],
          resolve,
          ( _, error ) => reject(error)
        )
      })
    })
  }

  static dropNotesTable () {
    return new Promise( (resolve,reject) => {
      db.transaction( tx => {
        tx.executeSql(
          'DROP TABLE notes',
          [],
          resolve,
          ( _, error ) => reject(error)
        )
      })
    })
  }

  static setNotes (notes) {
    return new Promise( (resolve,reject) => {
      db.transaction( tx => {  // async ?
        tx.executeSql('DELETE FROM notes')
        notes.map( ({title, text, itemBackground, category, date, type, password,isTrash}) => {
          const textStringify = JSON.stringify(text)
          const changedIsTrash = isTrash ? 1 : 0
          tx.executeSql(
            `INSERT INTO notes (title, text, itemBackground, category, date, type, password,isTrash) VALUES (?,?,?,?,?,?,?,?)`,
            [title, textStringify, itemBackground, category, date, type, password,changedIsTrash],
            ( _, result ) => resolve( result.insertId ),
            ( _, error ) => reject(error)
          )
        })
      })
    })
  }
}