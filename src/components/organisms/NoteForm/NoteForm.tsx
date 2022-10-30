import React from 'react';
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
import { Formik } from 'formik';
import { createNewNote } from '../../../library/services/NotesService';
import { NoteInterface } from '../../../library/interfaces/NoteInterface';
import { FolderInterface } from '../../../library/interfaces/FolderInterface';

/**
 * An interface containing the props to show and close the form.
 */
interface NoteFormProps {
  showModal: boolean;
  closeModal: (arg: boolean) => void;
  folders: Array<FolderInterface>;
}

/**
 * A form to create new notes.
 *
 * @param param0 - {@link NoteFormProps}
 */
export const NoteForm = ({ showModal, closeModal, folders }: NoteFormProps) => {
  const createNote = async (noteData: NoteInterface) => {
    createNewNote(noteData);
    closeModal(!showModal);
  };

  return (
    <Modal
      visible={showModal}
      onRequestClose={() => closeModal(!showModal)}
      transparent={true}>
      <Formik
        initialValues={{
          name: '',
          content: '',
          folder: folders[0]?.id || '',
          isLink: false,
          isFavorite: false,
        }}
        onSubmit={values => createNote(values)}>
        {({ handleChange, handleSubmit, values, setFieldValue }) => (
          <View style={styles.background}>
            <View style={styles.container}>
              <VStack spacing={25}>
                <View>
                  <MenuLabel>Note title</MenuLabel>
                  <TextInput
                    style={styles.inputWithBorder}
                    placeholder="Type something"
                    onChangeText={handleChange('name')}
                    value={values.name}
                  />
                </View>
                <View>
                  <MenuLabel>Note content</MenuLabel>
                  <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.inputWithBorder}
                    placeholder="Type something"
                    onChangeText={handleChange('content')}
                    value={values.content}
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
                      onSelect={selectedItem => {
                        setFieldValue('folder', selectedItem.id);
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
                      buttonTextAfterSelection={selectedItem =>
                        selectedItem?.name
                      }
                      rowTextForSelection={item => item?.name}
                    />
                  </HStack>
                </View>
                <View>
                  <MenuLabel>Note details</MenuLabel>
                  <HStack spacing={20} style={styles.noteDetails}>
                    <Flex inline center>
                      <Switch
                        value={values.isLink}
                        onChange={() => setFieldValue('isLink', !values.isLink)}
                      />
                      <Text
                        onPress={() => setFieldValue('isLink', !values.isLink)}>
                        Is link
                      </Text>
                    </Flex>
                    <Spacer />
                    <Flex inline center>
                      <Switch
                        value={values.isFavorite}
                        onChange={() =>
                          setFieldValue('isFavorite', !values.isFavorite)
                        }
                      />
                      <Text
                        onPress={() =>
                          setFieldValue('isFavorite', !values.isFavorite)
                        }>
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
                      onPress={handleSubmit}
                    />
                  </HStack>
                </Flex>
              </VStack>
            </View>
          </View>
        )}
      </Formik>
    </Modal>
  );
};
