import React, { useState } from 'react';
import { ColorPicker } from '@atoms/ColorPicker';
import { MenuLabel } from '@atoms/MenuLabel';
import { View, Modal, TextInput, Text } from 'react-native';
import { colors } from '../../../design/tokens/colors';
import { styles as folderStyles } from './FolderForm.style';
import { styles } from '../NoteForm/NoteForm.style';
import foldercolors from '../../atoms/ColorPicker/folderColors.json';

import {
  Button,
  Flex,
  HStack,
  Spacer,
  Switch,
} from '@react-native-material/core';

interface FolderFormProps {
  showModal: boolean;
  closeModal: (arg: boolean) => void;
}

const hexColors = foldercolors.Colors;

export const FolderForm = ({ showModal, closeModal }: FolderFormProps) => {
  const [isEnable, setIsEnable] = useState(false);

  return (
    <Modal
      visible={showModal}
      onRequestClose={() => closeModal(!showModal)}
      transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <View style={folderStyles.mt4}>
            <MenuLabel>Folder name</MenuLabel>
            <TextInput
              style={styles.inputWithBorder}
              placeholder="Type something"
            />
          </View>
          <View style={folderStyles.mt4}>
            <MenuLabel>Folder color</MenuLabel>
            <ColorPicker hexColors={hexColors} />
          </View>
          <View style={folderStyles.mt4}>
            <MenuLabel>Folder size</MenuLabel>
            <HStack spacing={20} style={styles.noteDetails}>
              <Flex inline center>
                <Switch
                  value={isEnable}
                  onValueChange={() => setIsEnable(!isEnable)}
                />
                <Text onPress={() => setIsEnable(!isEnable)}>Enable</Text>
              </Flex>
              <Spacer />
              {isEnable && (
                <Flex inline justify="center">
                  <Text style={folderStyles.alignText}>Limit: </Text>
                  <TextInput
                    style={styles.inputWithBorder}
                    placeholder="number"
                  />
                </Flex>
              )}
            </HStack>
          </View>
          <Flex inline center mt={15}>
            <HStack spacing={20}>
              <Button
                title="Cancel"
                variant="outlined"
                uppercase={false}
                color={colors.black}
                onPress={() => closeModal(!showModal)}
              />
              <Button
                title="Accept"
                uppercase={false}
                color={colors.primary}
                tintColor={colors.pureWhite}
                onPress={() => closeModal(!showModal)}
              />
            </HStack>
          </Flex>
        </View>
      </View>
    </Modal>
  );
};
