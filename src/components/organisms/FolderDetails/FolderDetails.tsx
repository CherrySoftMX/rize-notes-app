import React from 'react';
import { Alert, Text } from 'react-native';
import { Box, Flex, HStack, Spacer, VStack } from '@react-native-material/core';
import { IconButtonPopupMenu } from '@molecules/IconButtonContextMenu';
import { MenuOption } from 'react-native-popup-menu';
import { ProgressBar } from '@atoms/ProgressBar/ProgressBar';
import { colors } from '../../../design/tokens';
import { styles as folderDetailsStyle } from './FolderDetails.style';
import { styles } from '@organisms/Folder/Folder.style';
import { FolderInterface } from '../../../library/interfaces/FolderInterface';
import { FolderIcon } from '@atoms/FolderIcon';

export const FolderDetails = ({
  name,
  color,
  isLimited,
  limit,
  notes,
}: FolderInterface) => {
  return (
    <Flex style={styles.container} p={4}>
      <HStack>
        <FolderIcon color={color ? color : colors.yellowishMedium} />
        <Spacer />
        <VStack>
          <Text style={folderDetailsStyle.title}>
            {name ? name : 'Unnamed folder'}
          </Text>
          <Text style={folderDetailsStyle.subtitle}>
            {`${notes ? notes.length : 0} notes`}
          </Text>
        </VStack>
        <Spacer />
        <IconButtonPopupMenu iconName="menu" iconColor={colors.greyNickel}>
          <MenuOption onSelect={() => Alert.alert('Edit')} text="Edit" />
          <MenuOption onSelect={() => Alert.alert('Delete')} text="Delete" />
        </IconButtonPopupMenu>
      </HStack>
      <Spacer />
      <Box p={6} m={6}>
        {isLimited && (
          <ProgressBar
            completed={notes ? notes.length : 0}
            size={limit ? Number(limit) : 0}
          />
        )}
      </Box>
    </Flex>
  );
};
