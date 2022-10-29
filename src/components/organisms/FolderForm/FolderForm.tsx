import React, { useState } from 'react';
import { MenuLabel } from '@atoms/MenuLabel';
import { Modal, Text, TextInput, View } from 'react-native';
import { colors } from '../../../design/tokens/colors';
import { styles } from '@organisms/NoteForm/NoteForm.style';
import { useArrayNavigator } from '@hooks/useArrayNavigator';
import { Foldercolor } from '@atoms/FolderColor';
import {
  Button,
  Flex,
  HStack,
  Spacer,
  Switch,
  VStack,
} from '@react-native-material/core';
import { useToggle } from '@hooks/useToggle';

interface FolderFormProps {
  showModal: boolean;
  closeModal: (arg: boolean) => void;
}

const colorOptions = [
  colors.yellowishMedium,
  colors.lightGreen,
  colors.orangyRed,
  colors.lightLilac,
];

export const FolderForm = ({ showModal, closeModal }: FolderFormProps) => {
  const { currentIndex, setCurrentIndex } = useArrayNavigator(colorOptions);
  const [isEnabled, toggleIsEnabled] = useToggle(false);

  return (
    <Modal
      visible={showModal}
      onRequestClose={() => closeModal(!showModal)}
      transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <VStack spacing={25}>
            <View>
              <MenuLabel>Folder name</MenuLabel>
              <TextInput
                style={styles.inputWithBorder}
                placeholder="Type something"
              />
            </View>
            <View>
              <MenuLabel>Folder color</MenuLabel>
              <HStack spacing={6} style={styles.noteDetails}>
                {colorOptions.map((option, index) => (
                  <Foldercolor
                    key={index}
                    hexColor={option}
                    isSelected={currentIndex === index}
                    onPress={() => setCurrentIndex(index)}
                  />
                ))}
              </HStack>
            </View>
            <View>
              <MenuLabel>Folder size</MenuLabel>
              <HStack spacing={20} style={styles.noteDetails}>
                <Flex inline center>
                  <Switch value={isEnabled} onValueChange={toggleIsEnabled} />
                  <Text onPress={toggleIsEnabled}>Enable</Text>
                </Flex>
                <Spacer />
                <Flex inline center>
                  <Text>Limit:</Text>
                  <TextInput style={styles.inputWithBorder} placeholder="" />
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
