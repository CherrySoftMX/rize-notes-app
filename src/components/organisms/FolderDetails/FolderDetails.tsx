import React from 'react';
import { Alert, Text } from 'react-native';
import { Box, Flex, HStack, Spacer, VStack } from '@react-native-material/core';
import { CustomIcon } from '@atoms/CustomIcon/CustomIcon';
import { FolderProps } from '@organisms/Folder/props';
import { IconButtonPopupMenu } from '@molecules/IconButtonContextMenu';
import { MenuOption } from 'react-native-popup-menu';
import { ProgressBar } from '@atoms/ProgressBar/ProgressBar';
import { colors, fontSize } from '../../../design/tokens';
import { styles as folderDetailsStyle } from './FolderDetails.style';
import { styles } from '@organisms/Folder/Folder.style';

export const FolderDetails = ({
  title,
  numberOfNotes,
  isProgressBar,
  folderColor,
}: FolderProps) => {
  return (
    <Flex style={styles.container} p={4}>
      <HStack>
        <CustomIcon name="folder" size={48} color={folderColor} />
        <Spacer />
        <VStack>
          <Text style={folderDetailsStyle.title}>{title}</Text>
          <Text
            style={
              folderDetailsStyle.subtitle
            }>{`${numberOfNotes} notes`}</Text>
        </VStack>
        <Spacer />
        <IconButtonPopupMenu iconName="menu" iconColor={colors.greyNickel}>
          <MenuOption onSelect={() => Alert.alert('Edit')} text="Edit" />
          <MenuOption onSelect={() => Alert.alert('Delete')} text="Delete" />
        </IconButtonPopupMenu>
      </HStack>
      <Spacer />
      <Box p={6} m={6}>
        {isProgressBar && (
          <ProgressBar completed={numberOfNotes} size={fontSize.md} />
        )}
      </Box>
    </Flex>
  );
};
