import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import MenuLabel from '../../atoms/MenuLabel/MenuLabel';
import { TextInput, VStack, Flex, Switch, HStack, Avatar, Spacer, Button } from '@react-native-material/core';
import SelectDropdown from 'react-native-select-dropdown';
import { styles } from './NoteForm.style';

interface NoteFormProps {
  showModal: boolean;
  closeModal: (arg: boolean) => void;
}

const NoteForm = ({showModal, closeModal}: NoteFormProps) => {
  const [isLink, setIsLink] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const folders = ['Folder 1', 'Folder 2', 'Folder 3'];
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
              <TextInput
                variant='standard'
                inputStyle={styles.inputWithBorder}
              />
            </View>
            <View>
              <MenuLabel>Note content</MenuLabel>
              <TextInput
                variant='standard'
                multiline={true}
                numberOfLines={4}
                inputStyle={styles.inputWithBorder}
              />
            </View>
            <View>
              <MenuLabel>Choose a folder</MenuLabel>
              <HStack spacing={15} style={styles.noteDetails}>
                <Flex center>
                  <Avatar label='Test User' size={40}/>
                </Flex>
                <SelectDropdown
                  data={folders}
                  defaultValueByIndex={0}
                  buttonTextStyle={styles.dropdownText}
                  buttonStyle={styles.inputWithBorder}
                  rowTextStyle={styles.dropdownText}
                  search={true}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    return item
                  }}
                />
              </HStack>
            </View>
            <View>
              <MenuLabel>Note details</MenuLabel>
              <HStack spacing={20} style={styles.noteDetails}>
                <Flex inline center>
                  <Switch
                    value={isLink}
                    onValueChange={() => setIsLink(!isLink)}
                  />
                  <Text>Is link</Text>
                </Flex>
                <Spacer />
                <Flex inline center>
                  <Switch
                    value={isFavorite}
                    onValueChange={() => setIsFavorite(!isFavorite)}
                  />
                  <Text>Add to favorites</Text>
                </Flex>
              </HStack>
            </View>
            <Flex
              inline
              center
            >
              <HStack spacing={20}>
                <Button
                  title='Cancel'
                  variant='outlined'
                  onPress={() => closeModal(!showModal)}
                />
                <Button
                  title='Create'
                  onPress={() => closeModal(!showModal)}
                />
              </HStack>
            </Flex>
          </VStack>
        </View>
      </View>
    </Modal>
  );
};

export default NoteForm;
