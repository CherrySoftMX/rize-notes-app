import { CustomIcon } from '@atoms/CustomIcon/CustomIcon';
import { Box, Flex, Text } from '@react-native-material/core';
import { colors } from '../../../design/tokens/colors';
import React from 'react';
import { styles } from './Folder.style';
import { ProgressBar } from '@atoms/ProgressBar/ProgressBar';
import { IconButtonPopupMenu } from '@molecules/IconButtonContextMenu';
import { MenuOption } from 'react-native-popup-menu';
import { Alert } from 'react-native';

interface FolderProps {
  title: string;
  numberOfNotes: number;
  folderColor: string;
}

export const Folder = ({ title, numberOfNotes, folderColor }: FolderProps) => {
  return (
    <Flex fill direction="row" wrap justify="center" style={styles.card}>
      <Box>
        <CustomIcon name="folder" size={75} color={folderColor} />
        <Box ml={10}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{numberOfNotes}</Text>
        </Box>
      </Box>
      <IconButtonPopupMenu
        iconName="menu"
        iconColor={colors.greyNickel}
        style={styles.icon}>
        <MenuOption onSelect={() => Alert.alert('Edit')} text="Edit" />
        <MenuOption onSelect={() => Alert.alert('Delete')} text="Delete" />
      </IconButtonPopupMenu>
      <Box>
        <ProgressBar completed={30} />
      </Box>
    </Flex>
  );
};
