import React, { useState } from 'react';
import { Modal, Text, TextInput, View } from 'react-native';
import {
  Button,
  Flex,
  HStack,
  Spacer,
  Switch,
  VStack,
} from '@react-native-material/core';
import SelectDropdown from 'react-native-select-dropdown';
import { styles } from './NoteForm.style';
import Icon from 'react-native-vector-icons/Ionicons';
import { MenuLabel } from '@atoms/MenuLabel';
import { FolderIcon } from '@atoms/FolderIcon';
import { colors } from '../../../design/tokens';

interface NoteFormProps {
  showModal: boolean;
  closeModal: (arg: boolean) => void;
}

export const NoteForm = ({ showModal, closeModal }: NoteFormProps) => {
  const [isLink, setIsLink] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const folders = ['Folder 1', 'Folder 2', 'Folder 3'];
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => closeModal(!showModal)}
      transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <VStack spacing={25}>
            <View>
              <MenuLabel>Note title</MenuLabel>
              <TextInput
                style={styles.inputWithBorder}
                placeholder="Type something"
              />
            </View>
            <View>
              <MenuLabel>Note content</MenuLabel>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={styles.inputWithBorder}
                placeholder="Type something"
              />
            </View>
            <View>
              <MenuLabel>Choose a folder</MenuLabel>
              <HStack spacing={15} style={styles.noteDetails}>
                <Flex center>
                  <FolderIcon />
                </Flex>
                <SelectDropdown
                  data={folders}
                  defaultValueByIndex={0}
                  buttonTextStyle={styles.dropdownText}
                  buttonStyle={styles.dropdownContainer}
                  rowTextStyle={styles.dropdownText}
                  search={true}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                  }}
                  renderDropdownIcon={isOpened => {
                    return (
                      <Icon
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        color={colors.darkGreen}
                        size={20}
                      />
                    );
                  }}
                  buttonTextAfterSelection={selectedItem => selectedItem}
                  rowTextForSelection={item => item}
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
                  <Text onPress={() => setIsLink(!isLink)}>Is link</Text>
                </Flex>
                <Spacer />
                <Flex inline center>
                  <Switch
                    value={isFavorite}
                    onValueChange={() => setIsFavorite(!isFavorite)}
                  />
                  <Text onPress={() => setIsFavorite(!isFavorite)}>
                    Add to favorites
                  </Text>
                </Flex>
              </HStack>
            </View>
            <Flex inline center>
              <HStack spacing={20}>
                <Button
                  title="Cancel"
                  variant="outlined"
                  uppercase={false}
                  color="#212427"
                  onPress={() => closeModal(!showModal)}
                />
                <Button
                  title="Create"
                  uppercase={false}
                  color={colors.primary}
                  tintColor="#FEFEFE"
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
