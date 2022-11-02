import React from 'react';
import { Alert, Text, Pressable } from 'react-native';
import { Box, Flex, HStack, Spacer, VStack } from '@react-native-material/core';
import { IconButtonPopupMenu } from '@molecules/IconButtonContextMenu';
import { MenuOption } from 'react-native-popup-menu';
import { ProgressBar } from '@atoms/ProgressBar/ProgressBar';
import { colors } from '../../../design/tokens/colors';
import { styles } from './Folder.style';
import { FolderInterface } from '../../../library/interfaces/FolderInterface';
import { FolderIcon } from '@atoms/FolderIcon';

interface FolderComponentInterface {
  folder: FolderInterface;
  handleClick: (id: string) => void;
}

export const Folder = ({ folder, handleClick }: FolderComponentInterface) => {
  const { name, color, isLimited, limit = '1', notes, id = '0' } = folder;
  return (
    <Pressable onPress={() => handleClick(id)}>
      <Flex fill style={styles.container} p={6}>
        <VStack spacing={8}>
          <HStack>
            <FolderIcon color={color} />
            <Spacer />
            <IconButtonPopupMenu
              width={14}
              height={24}
              iconName="dots-three-vertical"
              iconLibrary="entypo"
              iconColor={colors.greyNickel}
              vAlign="flex-start"
              hAlign="flex-end">
              <MenuOption onSelect={() => Alert.alert('Edit')} text="Edit" />
              <MenuOption
                onSelect={() => Alert.alert('Delete')}
                text="Delete"
              />
            </IconButtonPopupMenu>
          </HStack>
          <Box>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{notes?.length}</Text>
          </Box>
          <Spacer />
          {isLimited && (
            <Box>
              <ProgressBar
                completed={notes?.length || 0}
                size={Number(limit)}
              />
            </Box>
          )}
        </VStack>
      </Flex>
    </Pressable>
  );
};
