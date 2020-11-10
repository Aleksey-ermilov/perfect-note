import React, { useEffect, useContext } from 'react';

import { NoteContext, OptionsAppContext } from './context/context';

import { getAppColorStory, getFontSizeStory, getFontFamilyStory, getSortNotesStory } from './storage';
import { DB } from './db'

export const LoadApp = ({ children }) => {
  const { loadCategories, loadNotes } = useContext(NoteContext);
  const { setColor, setFontFamily, setFontSize, setSortNote } = useContext(OptionsAppContext);

  useEffect( () => {

    ( async function f () {
      await getAppColorStory().then( color => {
        if(color){
          color = JSON.parse(color)
          setColor(color)
        }
    })
      await getFontFamilyStory().then( fontFamily => {
        if(fontFamily){
          fontFamily = JSON.parse(fontFamily)
          setFontFamily(fontFamily)
        }
      })
      await getFontSizeStory().then( fontSize => {
        if(fontSize){
          fontSize = JSON.parse(fontSize)
          setFontSize(fontSize)
        }
      })
      await getSortNotesStory().then( sort => {
        if(sort){
          sort = JSON.parse(sort)
          setSortNote(sort)
        }
      })

      // await DB.dropCategoriesTable().then( () => console.log('drop table categories'))
      // await DB.dropNotesTable().then(() => console.log('drop table notes'))

      await DB.init().then(() => console.log('DB init') )
      await DB.getCategories().then( categories => loadCategories(categories) )
      await DB.getNotes().then( notes => loadNotes(notes) )
    })()
  }, [])

  return (
    <>
      {children}
    </>
  );
}
