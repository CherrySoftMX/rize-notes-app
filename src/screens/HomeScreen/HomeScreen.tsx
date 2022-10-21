import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NoteForm } from '@organisms/NoteForm';

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable onPress={() => setShowModal(true)}>
          <Text>Open modal</Text>
        </Pressable>
      </View>
      <NoteForm showModal={showModal} closeModal={setShowModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
});
