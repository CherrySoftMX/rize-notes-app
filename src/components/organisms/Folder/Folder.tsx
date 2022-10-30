import React from 'react';
import { Alert, Text } from 'react-native';
import { Box, Flex, HStack, Spacer, VStack } from '@react-native-material/core';
import { CustomIcon } from '@atoms/CustomIcon/CustomIcon';
import { FolderProps } from './props';
import { IconButtonPopupMenu } from '@molecules/IconButtonContextMenu';
import { MenuOption } from 'react-native-popup-menu';
import { ProgressBar } from '@atoms/ProgressBar/ProgressBar';
import { colors } from '../../../design/tokens/colors';
import { styles } from './Folder.style';

export const Folder = ({
  title,
  numberOfNotes,
  folderColor,
  isProgressBar,
}: FolderProps) => {
  return (
    <Flex fill style={styles.container} p={6}>
      <HStack>
        <CustomIcon name="folder" size={50} color={folderColor} />
        <Spacer />
        <IconButtonPopupMenu iconName="menu" iconColor={colors.greyNickel}>
          <MenuOption onSelect={() => Alert.alert('Edit')} text="Edit" />
          <MenuOption onSelect={() => Alert.alert('Delete')} text="Delete" />
        </IconButtonPopupMenu>
      </HStack>
      <VStack m={8} spacing={8}>
        <Box>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{numberOfNotes}</Text>
        </Box>
        <Spacer />
        <Box>{isProgressBar && <ProgressBar completed={numberOfNotes} />}</Box>
      </VStack>
    </Flex>
  );
};
