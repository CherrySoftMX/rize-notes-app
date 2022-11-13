import React from 'react';
import { MenuLabel } from '@atoms/MenuLabel';
import { Modal, Text, TextInput, View } from 'react-native';
import { colors } from '../../../design/tokens';
import { styles } from '@organisms/NoteForm/NoteForm.style';
import { useArrayNavigator } from '@hooks/useArrayNavigator';
import { FolderColor } from '@atoms/FolderColor';
import {
  Button,
  Flex,
  HStack,
  Spacer,
  Switch,
  VStack,
} from '@react-native-material/core';
import { Formik } from 'formik';
import { CreateFolderRequest } from '../../../library/interfaces/Folder';
import { When } from 'react-if';

interface FolderFormProps {
  showModal: boolean;
  closeModal: (arg: boolean) => void;
  onSubmit: (arg: CreateFolderRequest) => void;
}

const colorOptions = [
  colors.yellowishMedium,
  colors.lightGreen,
  colors.orangyRed,
  colors.lightLilac,
];

export const FolderForm = ({
  showModal,
  closeModal,
  onSubmit,
}: FolderFormProps) => {
  const { currentIndex, setCurrentIndex } = useArrayNavigator(colorOptions);
  const createFolder = async (folderRequest: CreateFolderRequest) => {
    onSubmit(folderRequest);
    closeModal(!showModal);
  };
  return (
    <Modal
      visible={showModal}
      onRequestClose={() => closeModal(!showModal)}
      transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Formik
            initialValues={{
              name: '',
              color: colorOptions[currentIndex],
              isLimited: false,
              limit: '',
            }}
            onSubmit={values =>
              createFolder({
                ...values,
                limit: Number(values.limit) || undefined,
              })
            }>
            {({ handleChange, handleSubmit, values, setFieldValue }) => (
              <VStack spacing={25}>
                <View>
                  <MenuLabel>Folder name</MenuLabel>
                  <TextInput
                    style={styles.inputWithBorder}
                    placeholder="Type something"
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />
                </View>
                <View>
                  <MenuLabel>Folder color</MenuLabel>
                  <HStack spacing={6} style={styles.noteDetails}>
                    {colorOptions.map((option, index) => (
                      <FolderColor
                        key={index}
                        hexColor={option}
                        isSelected={currentIndex === index}
                        onPress={() => {
                          setCurrentIndex(index);
                          setFieldValue('color', colorOptions[index]);
                        }}
                      />
                    ))}
                  </HStack>
                </View>
                <View>
                  <MenuLabel>Folder size</MenuLabel>
                  <HStack spacing={20} style={styles.noteDetails}>
                    <Flex inline center>
                      <Switch
                        value={values.isLimited}
                        onChange={() => {
                          setFieldValue('isLimited', !values.isLimited);
                        }}
                      />
                      <Text
                        onPress={() => {
                          setFieldValue('isLimited', !values.isLimited);
                        }}>
                        Enable
                      </Text>
                    </Flex>
                    <Spacer />
                    <Flex inline center>
                      <When condition={values.isLimited}>
                        <Text>Limit:</Text>
                        <TextInput
                          style={styles.inputWithBorder}
                          placeholder="10"
                          keyboardType="numeric"
                          value={values.limit}
                          onChangeText={handleChange('limit')}
                        />
                      </When>
                    </Flex>
                  </HStack>
                </View>
                <Flex inline center>
                  <HStack spacing={20}>
                    <Button
                      title="Cancel"
                      variant="outlined"
                      uppercase={false}
                      color={colors.darkGunmetal}
                      onPress={() => closeModal(!showModal)}
                    />
                    <Button
                      title="Accept"
                      uppercase={false}
                      color={colors.primary}
                      tintColor={colors.paleGrey}
                      onPress={handleSubmit}
                    />
                  </HStack>
                </Flex>
              </VStack>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};
