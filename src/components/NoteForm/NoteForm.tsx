import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import MenuLabel from '../atoms/MenuLabel/MenuLabel';
import { TextInput, VStack, Flex, Switch, HStack } from '@react-native-material/core';

interface NoteFormProps {
  showModal: boolean;
  closeModal: (arg: boolean) => void;
}

const NoteForm = ({showModal, closeModal}: NoteFormProps) => {
  const [isLink, setIsLink] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => closeModal(!showModal)}
      transparent={true}
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <VStack spacing={25}>
            <View>
              <MenuLabel>Note title</MenuLabel>
              <TextInput variant='standard'/>
            </View>
            <View>
              <MenuLabel>Note content</MenuLabel>
              <TextInput variant='standard' multiline={true} numberOfLines={4}/>
            </View>
            <View>
              <MenuLabel>Choose a folder</MenuLabel>
              <TextInput variant='standard'/>
            </View>
            <View>
              <MenuLabel>Note details</MenuLabel>
              <Flex inline style={styles.noteDetails}>
                <HStack spacing={20}>
                  <Flex inline center>
                    <Switch
                      value={isLink}
                      onValueChange={() => setIsLink(!isLink)}
                    />
                    <Text>Is link</Text>
                  </Flex>
                  <Flex inline center>
                    <Switch
                      value={isFavorite}
                      onValueChange={() => setIsFavorite(!isFavorite)}
                    />
                    <Text>Add to favorites</Text>
                  </Flex>
                </HStack>
              </Flex>
            </View>
            <View>
              <Pressable onPress={() => closeModal(!showModal)}>
                <Text>Cerrar</Text>
              </Pressable>
            </View>
          </VStack>
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
  noteDetails: {
    marginTop: 10,
  },
});

export default NoteForm;
