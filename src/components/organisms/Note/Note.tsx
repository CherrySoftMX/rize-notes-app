import React from 'react';
import { CustomIcon } from '@atoms/CustomIcon/CustomIcon';
import { Flex } from '@react-native-material/core';
import { HairLine } from '@atoms/HairLine';
import { NotePreview } from '@organisms/NotePreview/NotePreview';
import { NoteProps } from './props';
import { colors } from '../../../design/tokens';
import { styles } from './Note.style';
import { IconButtonPopupMenu } from '@molecules/IconButtonContextMenu';
import { MenuOption } from 'react-native-popup-menu';
import { Alert } from 'react-native';

export const Note = ({ type, title, content, favorite }: NoteProps) => {
  return (
    <Flex fill direction="row" self="center" style={styles.card}>
      {favorite && <HairLine w={4} h="100%" color={colors.yellowishMedium} />}
      <CustomIcon name={type} size={20} color={colors.pureWhite} isRounded />
      <NotePreview title={title} content={content} />
      <IconButtonPopupMenu
        iconName="menu"
        iconColor={colors.greyNickel}
        style={styles.icon}>
        <MenuOption onSelect={() => Alert.alert('Edit')} text="Edit" />
        <MenuOption onSelect={() => Alert.alert('Delete')} text="Delete" />
      </IconButtonPopupMenu>
    </Flex>
  );
};
