import React, { useState  } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NoteForm } from '@organisms/NoteForm';
import { FolderForm } from '@organisms/FolderForm/FolderForm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotes } from '../../library/services/NotesService';
import { useAuth } from '@hooks/useAuth';

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const { user } = useAuth();
  const showNotes = async () => {
    const notes = await getNotes();
    console.log('Notas almacenadas:');
    console.log(notes);
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable onPress={() => setShowModal(true)}>
          <Text>Open modal</Text>
          <Text>Usuario: {user || 'No hay ningun usuario'}</Text>
        </Pressable>
        <Pressable onPress={() => showNotes()}>
          <Text>Ver notas</Text>
        </Pressable>
        <Pressable onPress={() => setShowFolderModal(true)}>
          <Text>Open folder modal</Text>
        </Pressable>
      </View>
      <NoteForm showModal={showModal} closeModal={setShowModal} />
      <FolderForm showModal={showFolderModal} closeModal={setShowFolderModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
});
