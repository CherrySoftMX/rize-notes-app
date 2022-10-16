import React, { useState } from 'react';
import { View, SafeAreaView, Pressable, Text, StyleSheet } from 'react-native';
import NoteForm from '../../components/NoteForm/NoteForm';

const TestScreen = () => {
  const [showModal, setShowModal] = useState(false);
  return(
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable
          onPress={() => setShowModal(true)}
        >
          <Text>Abrir modal</Text>
        </Pressable>
      </View>
      <NoteForm
        showModal={showModal}
        closeModal={setShowModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
});

export default TestScreen;
