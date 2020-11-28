import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { NoteContext, OptionsAppContext, UserContext } from './context/context';

import { getAppColorStory, getFontSizeStory, getFontFamilyStory, getSortNotesStory, getAppPasswordStory } from './storage';
import { DB } from './db'

import firebase from 'firebase';

export const LoadApp = ({ children }) => {
  const { loadCategories, loadNotes } = useContext(NoteContext);
  const { getUserAtRerun } = useContext(UserContext);
  const {
    loading,
    appColor,
    setLoading,
    setColor,
    setFontFamily,
    setFontSize,
    setSortNote,
    setAppPassword,
    setIsAuth,
  } = useContext(OptionsAppContext);

  useEffect( () => {

    ( async function f () {

      await getUserAtRerun()

      setLoading(true)
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
      await getAppPasswordStory().then( appPass => {
        if(appPass){
          appPass = JSON.parse(appPass)
          setAppPassword(appPass)
          setIsAuth(appPass.type === 'disabled' ? true : false)
        }else {
          setAppPassword( {type: 'disabled', password: ''} )
          setIsAuth(true)
        }
      })

      // await DB.dropCategoriesTable().then( () => console.log('drop table categories'))
      // await DB.dropNotesTable().then(() => console.log('drop table notes'))

      await DB.init().then(() => console.log('DB init') )
      await loadCategories()
      await loadNotes()
      setLoading(false)
    })()
  }, [])

  if (loading) return <View style={styles.noNotes}><ActivityIndicator animating={true} size={'large'} color={appColor} /></View>

  return (
    <>
      {children}
    </>
  );
}

const styles = StyleSheet.create({
  noNotes:{
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  }
});
