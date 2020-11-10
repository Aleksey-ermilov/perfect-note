import { db } from './index';

import { Notes } from './notes';

export class Categories {

  static getCategories () {
    return new Promise( (resolve, reject) => {
      db.transaction( tx => {
        tx.executeSql(
          'SELECT * FROM categories',
          [],
          ( _, result ) => resolve( result.rows._array.map( item => ({ ...item, id: item.id.toString() }) ) ),
          ( _, error ) => reject(error)
        )
      })
    })
  }

  static createCategory (category) {
    // console.log('createCategory', category);

    return new Promise( (resolve,reject) => {
      db.transaction( tx => {
        tx.executeSql(
          `INSERT INTO categories (category, id) VALUES (?,?)`,
          [category],
          ( _, result ) => resolve( result.insertId.toString() ),
          ( _, error ) => reject(error)
        )
      })
    })
  }

  // static updateCategory ({category, id}) {
  //   return new Promise( (resolve,reject) => {
  //     db.transaction( tx => {
  //       tx.executeSql(
  //         'UPDATE categories SET category = ? WHERE id = ?',
  //         [category, id],
  //         resolve,
  //         ( _, error ) => reject(error)
  //       )
  //     })
  //   })
  // }

  static removeCategory (id) {
    return new Promise( (resolve,reject) => {
      db.transaction( tx => {
        tx.executeSql(
          'DELETE FROM categories WHERE id = ?',
          [id],
          () => {
            console.log(`all remove notes in category ${id}`)
            resolve()
          },
          ( _, error ) => reject(error)
        )
      })
    })
  }

  static dropCategoriesTable () {
    return new Promise( (resolve,reject) => {
      db.transaction( tx => {
        tx.executeSql(
          'DROP TABLE categories',
          [],
          resolve,
          ( _, error ) => reject(error)
        )
      })
    })
  }
}