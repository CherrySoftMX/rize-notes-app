import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import MenuLabel from '../atoms/MenuLabel/MenuLabel';

interface NoteFormProps {
  showModal: boolean;
  closeModal: (arg: boolean) => void;
}

const NoteForm = ({showModal, closeModal}: NoteFormProps) => {
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => closeModal(!showModal)}
      transparent={true}
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <MenuLabel>Note title</MenuLabel>
          <MenuLabel>Note content</MenuLabel>
          <MenuLabel>Choose a folder</MenuLabel>
          <MenuLabel>Note details</MenuLabel>
          <Pressable onPress={() => closeModal(!showModal)}>
            <Text>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEFEFE',
    width: '80%',
    height: 'auto',
    borderRadius: 10,
    marginTop: 25,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  label: {
    textAlign: 'center',
  },
});

export default NoteForm;
