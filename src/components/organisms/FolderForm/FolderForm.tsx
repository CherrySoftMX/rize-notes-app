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
  const [isLink, setIsLink] = useState(false);

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
              <HStack spacing={15} style={styles.noteDetails}>
                <HStack m={6} spacing={6}>
                  {colorOptions.map((option, index) => (
                    <Foldercolor
                      key={index}
                      hexColor={option}
                      isSelected={currentIndex === index}
                      onPress={() => setCurrentIndex(index)}
                    />
                  ))}
                </HStack>
              </HStack>
            </View>
            <View>
              <MenuLabel>Folder size</MenuLabel>
              <HStack spacing={20} style={styles.noteDetails}>
                <Flex inline center>
                  <Switch
                    value={isLink}
                    onValueChange={() => setIsLink(!isLink)}
                  />
                  <Text onPress={() => setIsLink(!isLink)}>Enable</Text>
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
