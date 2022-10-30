import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NoteForm } from '@organisms/NoteForm';
import { FolderForm } from '@organisms/FolderForm/FolderForm';
import { getNotes } from '../../library/services/NotesService';
import { useAuth } from '@hooks/useAuth';
import {
  getFolders,
  getFoldersWithNotes,
} from '../../library/services/FoldersService';
import { FolderInterface } from '.././../library/interfaces/FolderInterface';

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folders, setFolders] = useState([] as Array<FolderInterface>);
  const { user } = useAuth();

  const showNotes = async () => {
    const notes = await getNotes();
    console.log('Notas almacenadas:');
    console.log(notes);
  };

  const showFolders = async () => {
    const foldersWithNotes = await getFoldersWithNotes();
    console.log('Carpetas almacenadas:');
    console.log(foldersWithNotes);
  };

  const openNotesForm = async () => {
    const receivedFolders: Array<FolderInterface> = await getFolders();
    setFolders(receivedFolders);
    setShowModal(true);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable onPress={() => openNotesForm()}>
          <Text>Open modal</Text>
          <Text>Usuario: {user || 'No hay ningun usuario'}</Text>
        </Pressable>
        <Pressable onPress={() => showNotes()}>
          <Text>Ver notas</Text>
        </Pressable>
        <Pressable onPress={() => setShowFolderModal(true)}>
          <Text>Open folder modal</Text>
        </Pressable>
        <Pressable onPress={() => showFolders()}>
          <Text>Ver carpetas</Text>
        </Pressable>
      </View>
      <NoteForm
        showModal={showModal}
        closeModal={setShowModal}
        folders={folders}
      />
      <FolderForm showModal={showFolderModal} closeModal={setShowFolderModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
});
