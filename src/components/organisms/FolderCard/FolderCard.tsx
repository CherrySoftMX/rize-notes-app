import React from 'react';
import { Alert, Text, Pressable } from 'react-native';
import { Box, Flex, HStack, Spacer, VStack } from '@react-native-material/core';
import { IconButtonPopupMenu } from '@molecules/IconButtonPopupMenu';
import { MenuOption } from 'react-native-popup-menu';
import { ProgressBar } from '@atoms/ProgressBar/ProgressBar';
import { colors } from '../../../design/tokens';
import { styles } from './FolderCard.style';
import { Folder } from '../../../library/interfaces/Folder';
import { FolderIcon } from '@atoms/FolderIcon';
import { When } from 'react-if';

interface FolderCardProps {
  folder: Folder;
  handleClick: (id: string) => void;
  handleDelete: (id: string) => void;
  handleEdit: (folder: Folder) => void;
}

export const FolderCard = ({
  folder,
  handleClick,
  handleDelete,
  handleEdit,
}: FolderCardProps) => {
  const { id, name, color, isLimited, limit = 1, noteIds } = folder;

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
              iconLibrary="entypo"
              iconName="dots-three-vertical"
              iconColor={colors.greyNickel}
              vAlign="flex-start"
              hAlign="flex-end">
              <MenuOption onSelect={() => handleEdit(folder)} text="Edit" />
              <MenuOption onSelect={() => handleDelete(id)} text="Delete" />
            </IconButtonPopupMenu>
          </HStack>
          <Box>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{noteIds?.length}</Text>
          </Box>
          <Spacer />
          <When condition={isLimited}>
            <Box>
              <ProgressBar noteCount={noteIds?.length || 0} size={limit} />
            </Box>
          </When>
        </VStack>
      </Flex>
    </Pressable>
  );
};
