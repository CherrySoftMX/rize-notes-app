import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NoteForm } from '@organisms/NoteForm';
import { FolderForm } from '@organisms/FolderForm';

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable onPress={() => setShowModal(true)}>
          <Text>Open modal</Text>
        </Pressable>
        <Pressable onPress={() => setShowFolderModal(true)}>
          <Text>Open Folder Modal</Text>
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
